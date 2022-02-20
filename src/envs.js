const { config } = require('dotenv');
config();

module.exports = {
  port: process.env.PORT || 3000,
  graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
  mongoUrl: process.env.MONGO_URL,
  redisUrl: process.env.REDIS_URL
};
