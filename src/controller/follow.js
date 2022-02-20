const FollowModel = require('../schema/follow');

const followUser = async (payload) => {
  const followAction = new FollowModel(payload);
  const followActionData = await followAction.save(payload);
  return followActionData;
}

const getAll = async (payload) => {
  const followData = await FollowModel.find();
  return followData;
}

module.exports = {
  followUser,
  getAll
  // removeFollowUser
};