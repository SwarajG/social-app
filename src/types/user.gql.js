const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
    isAdmin: Boolean
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    register(
      username: String
      email: String
      password: String
      profilePicture: String
      isAdmin: Boolean
    ): User
    login(email: String, password: String): User
  }
`;

module.exports = typeDefs;
