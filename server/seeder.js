import "dotenv/config";
import { initModels } from "./models/index.js";
import { Sequelize } from "sequelize";
import { authorsData, booksData, reviewsData } from "./sample-data.js";
import mongoose from "mongoose";
import { Review } from "./models/Review.js";

async function seedDatabase() {
	const sequelize = new Sequelize(process.env.PG_CONNECTION_URL);

	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const { Author, Book } = initModels(sequelize);
		await sequelize.sync({ force: true });

		const authors = await Author.bulkCreate(authorsData);
		console.log(`Added ${authors.length} authors`);

		const books = await Book.bulkCreate(booksData);
		console.log(`Added ${books.length} books`);

		await Review.deleteMany({});
		const reviews = await Review.insertMany(reviewsData);
		console.log(`Added ${reviews.length} reviews`);
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		await sequelize.close();
		await mongoose.connection.close();
	}
}

seedDatabase();
