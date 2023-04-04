import mongoose from "mongoose";
import { USER_ROLE } from "../constants/user.constants.js";
const { Schema } = mongoose;

// const userSchema = new mongoose.Schema({
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email_required"],
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: [true, "password_required"] },
    role: {
      type: Number,
      default: USER_ROLE.member,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

const User = new mongoose.model("User", userSchema);
// creation d'une collection nommée 'users'

export default User;
