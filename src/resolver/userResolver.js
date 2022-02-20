const userController = require('../controller/user');

const resolvers = {
  Query: {
    users: async () => {
      const users = await userController.findAll();
      return users;
    },
    user: async ({ userId }) => {
      const user = await userController.findById(userId);
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
  },
};

module.exports = resolvers;
