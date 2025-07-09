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
				authorId
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

export const DELETE_AUTHOR = gql`
	mutation DeleteAuthor($id: ID!) {
		deleteAuthor(id: $id)
	}
`;

export const UPDATE_AUTHOR = gql`
	mutation UpdateAuthor($id: ID!, $input: AuthorInput!) {
		updateAuthor(id: $id, input: $input) {
			name
			biography
			bornDate
		}
	}
`;

export const UPDATE_BOOK = gql`
	mutation UpdateBook($id: ID!, $input: BookInput!) {
		updateBook(id: $id, input: $input) {
			title
			description
			publishedDate
		}
	}
`;

// TODO: pass count to remove limit hardcoding
export const GET_AUTHOR_LIST = gql`
	query GetAuthorList {
		authors(limit: 1000, offset: 0, filter: {}) {
			items {
				id
				name
			}
		}
	}
`;
