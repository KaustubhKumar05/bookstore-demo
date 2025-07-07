import { Op } from "sequelize";

export const resolvers = {
	Query: {
		author: async (_, { id }, { models }) => {
			return models.Author.findByPk(id, {
				include: {
					model: models.Book,
					as: "books",
				},
			});
		},
		book: async (_, { id }, { models }) => {
			return models.Book.findByPk(id, {
				include: {
					model: models.Author,
					as: "author",
				},
			});
		},
		authors: async (_, { limit, offset, filter }, { models }) => {
			const where = {};
			if (filter.name) {
				where.name[Op.iLike] = `${filter.name}%`;
			}

			if (filter.birthYear) {
				where.born_date = {
					[Op.and]: [
						{ [Op.gte]: new Date(`${filter.birthYear}-01-01`) },
						{ [Op.lte]: new Date(`${filter.birthYear}-12-31`) },
					],
				};
			}
			const { count, rows } = await models.Author.findAndCountAll({
				where,
				limit,
				offset,
				include: {
					model: models.Book,
					as: "books",
				},
			});

			return { items: rows, count };
		},
		books: async (_, { limit, offset, filter }, { models }) => {
			const where = {};
			const include = [];

			if (filter.title) {
				where.title[Op.iLike] = `%${filter.title}%`;
			}

			if (filter.authorName) {
				include.push({
					model: models.Author,
					as: "author",
					where: {
						name: { [Op.iLike]: `%${filter.authorName}%` },
					},
				});
			}

			if (filter.publishedAfter || filter.publishedBefore) {
				where.published_date = {};

				if (filter.publishedBefore) {
					where.published_date[Op.lte] = new Date(filter.publishedBefore);
				}

				if (filter.publishedAfter) {
					where.published_date[Op.gte] = new Date(filter.publishedAfter);
				}
			}
			const { count, rows } = await models.Book.findAndCountAll({
				where,
				include: include.length
					? include
					: {
							model: models.Author,
							as: "author",
						},
				limit,
				offset,
			});
			return { items: rows, count };
		},
	},
	Mutation: {
		createAuthor: async (_, { input }, { models }) => {
			return await models.Author.create({
				name: input.name,
				biography: input.biography,
				born_Date: input.bornDate,
			});
		},
		updateAuthor: async (_, { id, input }, { models }) => {
			const author = await models.Author.findByPk(id);
			if (!author) {
				throw new Error("Author not found");
			}
			return await author.update({
				name: input.name,
				biography: input.biography,
				born_date: input.bornDate,
			});
		},
		deleteAuthor: async (_, { id }, { models }) => {
			const author = await models.Author.findByPk(id);
			if (!author) {
				throw new Error("Author not found");
			}
			await author.destroy();
			return true;
		},
		createBook: async (_, { input }, { models }) => {
			return await models.Book.create({
				title: input.title,
				description: input.description,
				published_date: input.publishedDate,
				author_id: input.authorId,
			});
		},
		updateBook: async (_, { id, input }, { models }) => {
			const book = await models.Book.findByPk(id);
			if (!book) {
				throw new Error("Book not found");
			}

			return await book.update({
				title: input.title,
				description: input.description,
				published_date: input.publishedDate,
				author_id: input.authorId,
			});
		},
		deleteBook: async (_, { id }, { models }) => {
			const book = await models.Book.findByPk(id);
			if (!book) {
				throw new Error("Book not found");
			}
			await book.destroy();
			return true;
		},
	},
	Author: {
		books: async (author) => {
			return await author.getBooks();
		},
		bornDate: (author) => author.born_date.toISOString().split("T")[0],
	},
	Book: {
		author: async (book) => {
			return await book.getAuthor();
		},
		publishedDate: (book) => book.published_date?.toISOString().split("T")[0],
	},
};
