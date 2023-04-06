import { UserDAO } from "../daos/user.daos.js";
import User from "../models/user.model.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { omitMulti } from "../utils/object.utils.js";
import { emailIsValid, passwordIsValid } from "../utils/regex.utils.js";
import { stringIsFilled } from "../utils/string.utils.js";

const signUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  app.get("/sign-up", (req, res) => {
    res.send("ca marche ! ");
  });

  if (!emailIsValid(email.toLowerCase())) {
    return res.status(400).json({ message: "invalid_email" });
  }
  // if (!passwordIsValid(password)) {
  //   return res.status(400).json({ message: "invalid_password" });
  // }
  const user = await UserDAO.createUser(email, password);
  if (!user) return res.status(403).json({ message: `email_already_exist` });

  const token = jwtSign(user.id, user.role);
  console.log(user.role);

  res.status(201).json({ message: "user_created", user, token });
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  app.get("/sign-in", (req, res) => {
    res.send("ca marche ! ");
  });

  if (!stringIsFilled(email) || !stringIsFilled(password)) {
    return res
      .status(404)
      .json({ message: "email or password is not correct" });
  }
  // console.log(email);
  // console.log(password);
  const user = await UserDAO.readUserByEmail(email);

  if (user && user.password === password) {
    console.log(user.id);
    const token = jwtSign(user.id);
    res.status(200).json({
      message: "ok",
      user: omitMulti(user, ["password", "id"]),
      token,
    });
  } else {
    res.status(401).json({ message: "login_failed" });
  }
};

const read = async (req, res) => {
  const users = await UserDAO.readAll();
  if (!users) return res.status(400).json({ message: `can't retrieve users` });
  res.status(200).json({ users });
};

const readUserById = async (req, res) => {
  const user_id = req.body.userId;

  const user = await User.findById(user_id);
  if (!user) return res.status(400).json({ message: `cannot_find_user` });

  const readingUser = await UserDAO.readById(user_id);
  if (!readingUser)
    return res.status(400).json({ message: `cannot_read_user` });

  res.status(200).json({
    message: `user with id ${user_id} was successfully read`,
    user: readingUser,
  });
};
// const getUserInfos = async (req, res) => {
//   const { userId } = req.body;
//   const user = await UserDAO.readById(userId);
//   if (!user) return res.status(400).json({ message: `can't retrieve user` });
//   res.status(200).json({ user: omit(user, "password") });
// };

export const UserController = {
  readUserById,
  signUp,
  read,
  signIn,
};
