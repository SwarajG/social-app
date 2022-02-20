const PostModel = require('../schema/post');

const addPost = async (payload) => {
  const post = new PostModel(payload);
  const postData = await post.save(payload);
  return postData;
};

const getAllPostFromUser = async (userId) => {
  const query = PostModel.where({ userId });
  const posts = await query.find();
  return posts;
};

const getPostById = async (postId) => {
  const post = await PostModel.findById(postId);
  return post;
};

const removePost = async (postId) => {
  const post = await PostModel.findByIdAndDelete(postId);
  return post;
};

module.exports = {
  addPost,
  getAllPostFromUser,
  getPostById,
  removePost
};
