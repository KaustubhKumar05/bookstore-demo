import { DataTypes } from "sequelize";

export const initAuthor = (sqlz) => {
	const Author = sqlz.define(
		"Author",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			biography: {
				type: DataTypes.TEXT,
			},
			born_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{ tableName: "authors" }
	);

	return Author;
};
