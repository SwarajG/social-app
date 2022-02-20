const { gql } = require('apollo-server');

const typeDefs = gql`
  type Follow {
    followerId: String
    followeeId: String
  }

  type Query {
    followList: [Follow]
  }

  type Mutation {
    follow(followerId: String, followeeId: String): Follow
  }
`;

module.exports = typeDefs;