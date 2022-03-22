const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String!
    isAdmin: Boolean
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  input AuthInput {
    accessToken: String!
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
    authGoogle(input: AuthInput!): User
  }
`;

module.exports = typeDefs;
