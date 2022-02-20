const followController = require('../controller/follow');

const resolvers = {
  Query: {
    followList: async () => {
      const followList = await followController.getAll();
      return followList;
    }
  },
  Mutation: {
    follow: async (_, payload) => {
      const followAction = await followController.followUser(payload);
      if (followAction) {
        return followAction;
      }
    }
  },
};

module.exports = resolvers;
