const postController = require('../controller/post');

const resolvers = {
  Query: {
    posts: async (_, { userId }) => {
      const posts = await postController.getAllPostFromUser(userId);
      return posts;
    },
    post: async (_, { id }) => {
      const post = await postController.getPostById(id);
      return post;
    },
  },
  Mutation: {
    addPost: async (_, payload) => {
      const post = await postController.addPost(payload);
      if (post) {
        return post;
      }
    },
    removePost: async (_, payload) => {
      const post = await postController.removePost(payload);
      if (post) {
        return post;
      }
    }
  },
};

module.exports = resolvers;
