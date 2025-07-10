export const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
    biography: String
    bornDate: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    description: String
    publishedDate: String
    authorId: ID!
    author: Author
  }

  type Review {
    id: ID!
    reviewText: String!
    username: String!
    bookId: ID!
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }

  input AuthInput {
    username: String!
    password: String!
  }

  input AuthorInput {
    name: String!
    biography: String
    bornDate: String!
  }

  input BookInput {
    title: String!
    description: String
    publishedDate: String
    authorId: ID!
  }

  input AuthorFilter {
    name: String
    birthYear: Int
  }

  input BookFilter {
    title: String
    authorName: String
    publishedAfter: String
    publishedBefore: String
  }

  type AuthorsResult {
    items: [Author!]!
    count: Int!
  }
  
  type BooksResult {
    items: [Book!]!
    count: Int!
  }

  type AuthResult {
    token: String!
    user: User!
  }

  type Query {
    authors(limit: Int = 10, offset: Int = 0, filter: AuthorFilter): AuthorsResult!
    author(id: ID!): Author
    books(limit: Int = 10, offset: Int = 0, filter: BookFilter): BooksResult!
    book(id: ID!): Book
    reviews(bookId: ID!): [Review]
  }

  type Mutation {
    createAuthor(input: AuthorInput!): Author!
    updateAuthor(id: ID!, input: AuthorInput!): Author!
    deleteAuthor(id: ID!): Boolean!

    createBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    deleteBook(id: ID!): Boolean!

    signUp(input: AuthInput!): AuthResult!
    logIn(input: AuthInput!): AuthResult!
  }
`;
