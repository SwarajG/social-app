const mongoose = require('mongoose');
const userController = require('../controller/user');
const { authenticateGoogle } = require('../passport');

const User = mongoose.model('User');

const resolvers = {
  Query: {
    users: async () => {
      const users = await userController.getUsers();
      return users;
    },
    user: async (_, { userId }) => {
      const user = await userController.getUserById(userId);
      return user;
    },
  },
  Mutation: {
    register: async (_, payload) => {
      const user = await userController.registerUser(payload);
      if (user) {
        return user;
      }
    },
    login: async (_, payload) => {
      const user = await userController.loginUser(payload);
      if (user) {
        // user.token = Buffer.from(email).toString('base64');
        return user;
      }
    },
    authGoogle: async (_, { input: { accessToken } }, { req, res }) => {
      req.body = {
        ...req.body,
        access_token: accessToken,
      };

      try {
        // data contains the accessToken, refreshToken and profile from passport
        const { data, info } = await authenticateGoogle(req, res);

        if (data) {
          const user = await User.upsertGoogleUser(data);

          if (user) {
            const response = {
              name: user.name,
              token: user.generateJWT(),
              email: data.profile._json.email
            };
            console.log(response);
            return response;
          }
        }

        if (info) {
          console.log(info);
          switch (info.code) {
            case 'ETIMEDOUT':
              return new Error('Failed to reach Google: Try Again');
            default:
              return new Error('something went wrong');
          }
        }
        return Error('server error');
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = resolvers;
