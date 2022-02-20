const { makeExecutableSchema } = require('@graphql-tools/schema');
const userSchema = require('./types/user.gql');
const followSchema = require('./types/follow.gql');
const postSchema = require('./types/post.gql');
const userResolver = require('./resolver/userResolver');
const followResolver = require('./resolver/followResolver');
const postResolve = require('./resolver/postResolver');

module.exports = makeExecutableSchema({
  typeDefs: [userSchema, followSchema, postSchema],
  resolvers: [userResolver, followResolver, postResolve],
});
