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

export const GET_AUTHOR_LIST = gql`
	query GetAuthorList {
		authors(limit: null, offset: 0, filter: {}) {
			items {
				id
				name
			}
		}
	}
`;

export const GET_AUTHOR = gql`
	query GetAuthor($id: ID!) {
		author(id: $id) {
			name
		}
	}
`;

export const CREATE_AUTHOR = gql`
	mutation CreateAuthor($input: AuthorInput!) {
		createAuthor(input: $input) {
			id
		}
	}
`;

export const CREATE_BOOK = gql`
	mutation CreateBook($input: BookInput!) {
		createBook(input: $input) {
			id
		}
	}
`;

export const GET_REVIEWS = gql`
	query GetReviews($bookId: ID!) {
		reviews(bookId: $bookId) {
			id
			reviewText
			username
		}
	}
`;

export const SIGNUP = gql`
	mutation Signup($input: AuthInput!) {
		signUp(input: $input) {
			token
			user {
				username
			}
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: AuthInput!) {
		logIn(input: $input) {
			token
			user {
				username
			}
		}
	}
`;
