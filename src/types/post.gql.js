const { gql } = require('apollo-server');

const typeDefs = gql`
  type Post {
    userId: String
    text: String
  }

  type Query {
    posts(userId: ID!): Post
    post(id: ID!): [Post]
  }

  type Mutation {
    addPost(userId: String, text: String): Post
    removePost(postId: String): Post
  }
`;

module.exports = typeDefs;