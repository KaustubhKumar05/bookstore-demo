import "dotenv/config";
import { Sequelize } from "sequelize";
import { initModels } from "./models/index.js";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

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

const server = new ApolloServer({ typeDefs, resolvers });

sequelize.sync().then(async () => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: process.env.PORT || 4000 },
		context: async () => ({
			models: { Author, Book },
		}),
	});
	console.log("Running at", url);
});
