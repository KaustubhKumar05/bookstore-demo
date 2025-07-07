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
    author: Author!
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
    bornYear: Int
  }

  input BookFilter {
    title: String
    authorName: String
    publishedAfter: String
    publishedBefore: String
  }

  type Query {
    authors(limit: Int = 10, offset: Int = 0, filter: AuthorFilter): [Author!]!
    author(id: ID!): Author
    books(limit: Int = 10, offset: Int = 0, filter: BookFilter): [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createAuthor(input: AuthorInput!): Author!
    updateAuthor(id: ID!, input: AuthorInput!): Author!
    deleteAuthor(id: ID!): Boolean!

    createBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;
