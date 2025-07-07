import { initAuthor } from "./Author.js";
import { initBook } from "./Book.js";

export const initModels = (sqlz) => {
	const Author = initAuthor(sqlz);
	const Book = initBook(sqlz);

	Author.hasMany(Book, { foreignKey: "author_id", as: "books" });
	Book.belongsTo(Author, { foreignKey: "author_id", as: "author" });

	return { Author, Book };
};
