const { makeExecutableSchema } = require('@graphql-tools/schema');
const userSchema = require('./types/user.gql');
const followSchema = require('./types/follow.gql');
const userResolver = require('./resolver/userResolver');
const followResolver = require('./resolver/followResolver');

module.exports = makeExecutableSchema({
  typeDefs: [userSchema, followSchema],
  resolvers: [userResolver, followResolver],
});
