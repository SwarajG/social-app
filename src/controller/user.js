const passwordHash = require('password-hash');
const UserModel = require('../schema/user');

const registerUser = async (payload) => {
  const { username, email, password } = payload;
  const error = {
    error: true,
    type: '',
  };
  if (!username) {
    error.type = 'User name can not be empty';
    return error;
  }
  if (!email) {
    error.type = 'Email can not be empty';
    return error;
  }
  if (!password) {
    error.type = 'Password can not be empty';
    return error;
  }
  const hashedPassword = passwordHash.generate(password);
  const data = {
    ...payload,
    password: hashedPassword,
  };

  const user = new UserModel(data);
  const userData = await user.save(data);
  return userData;
};

const loginUser = async (payload) => {
  const { email, password } = payload;
  const error = { error: true };
  if (!email) {
    error.type = 'Email can not be empty';
    return error;
  }
  if (!password) {
    error.type = 'Password can not be empty';
    return error;
  }
  const query = UserModel.where({ email });
  const userData = await query.findOne();
  if (passwordHash.verify(password, userData.password)) {
    return userData;
  }
  return {
    error: true,
    type: 'Password does not match',
  };
};

module.exports = {
  registerUser,
  loginUser,
};
