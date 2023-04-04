import User from "../models/user.model.js";
import { formatUser, formatUsers } from "../utils/user.utils.js";

const createUser = async (email, password) => {
  try {
    const user = new User({ email, password });
    const createdUser = await user.save();
    return createdUser ? formatUser(createdUser) : null;
  } catch (e) {
    console.error(`user.dao - create : ${e.message}`);
    return null;
  }
};

const readUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    return user ? formatUser(user) : null;
  } catch (e) {
    console.error(`user.dao - readByEmail : ${e.message}`);
    return null;
  }
};
const readAllUsers = async () => {
  try {
    const users = await User.find();
    return users ? formatUsers(users) : null;
  } catch (e) {
    console.error(`user.dao - readAll : ${e.message}`);
    return null;
  }
};
const readById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user ? formatUser(user) : null;
  } catch (e) {
    logError(`user.dao - readById : ${e.message}`);
    return null;
  }
};

export const UserDAO = {
  readUserByEmail,
  readAllUsers,
  createUser,
  readById,
};
