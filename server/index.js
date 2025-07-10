import "dotenv/config";
import { Sequelize } from "sequelize";
import { initModels } from "./models/index.js";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { authMiddleware } from './authMiddleware.js';

const sequelize = new Sequelize(process.env.PG_CONNECTION_URL);

try {
	await sequelize.authenticate();
	console.log("Connected to the database");
} catch (err) {
	console.error("Could not connect to the database: ", err);
}

const { Book, Author } = initModels(sequelize);

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB server");
});

mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err);
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, authMiddleware);

const server = new ApolloServer({ schema: schemaWithMiddleware });

sequelize.sync().then(async () => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: process.env.PORT || 4000 },
		context: async ({ req }) => {
			const authHeader = req.headers.authorization || "";
			let user = null;
			if (authHeader.startsWith("Bearer ")) {
				const token = authHeader.split(" ")[1];
				try {
					user = jwt.verify(token, process.env.JWT_SECRET);
				} catch (e) {
					user = null;
				}
			}
			return {
				models: { Author, Book },
				user,
			};
		},
	});
	console.log("Running at", url);
});
