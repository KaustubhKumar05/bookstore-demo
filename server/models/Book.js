import { DataTypes } from "sequelize";

export const initBook = (sqlz) => {
	const Book = sqlz.define(
		"Book",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
			},
			published_date: {
				type: DataTypes.DATE,
			},
			author_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "authors",
					key: "id",
				},
				onDelete: "CASCADE",
			},
		},
		{ tableName: "books" }
	);

	return Book;
};
