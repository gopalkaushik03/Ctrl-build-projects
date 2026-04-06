const User = require('../models/user.model');

exports.createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

exports.getAllUsers = async () => {
  return await User.find();
};