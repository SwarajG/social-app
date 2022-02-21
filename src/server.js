const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { createClient } = require('redis');
const isEmail = require('isEmail');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const schema = require('./merger');
const RedisClient = require('./redisClient');
const envs = require('./envs');

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const redisClient = createClient();
  app.use(morgan('common'));

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  await mongoose.connect(envs.mongoUrl);

  await redisClient.connect({
    url: envs.redisUrl,
  });

  new RedisClient(redisClient);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // const auth = (req.headers && req.headers.authorization) || '';
      // const email = Buffer.from(auth, 'base64').toString('ascii');
      // if (!isEmail.validate(email)) return { user: null };
      // // find a user by their email
      // const users = await store.users.findOrCreate({ where: { email } });
      // const user = (users && users[0]) || null;
      // return { user: { ...user.dataValues } };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

async function init() {
  await startApolloServer();
}

init();
