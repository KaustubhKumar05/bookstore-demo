import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
	query GetAuthors($limit: Int, $offset: Int, $filter: AuthorFilter) {
		authors(limit: $limit, offset: $offset, filter: $filter) {
			items {
				id
				name
				biography
				bornDate
			}
			count
		}
	}
`;

export const GET_BOOKS = gql`
	query GetBooks($limit: Int, $offset: Int, $filter: BookFilter) {
		books(limit: $limit, offset: $offset, filter: $filter) {
			items {
				id
				title
				description
				publishedDate
			}
			count
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id)
	}
`;
