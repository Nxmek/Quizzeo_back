import mongoose from "mongoose";

const { Schema } = mongoose;

const responseSchema = new Schema({
  value: {
    type: String,
    required: [true, "response_required"],
  },
  good_one: {
    type: Boolean,
    required: [true, "goodOne_required"],
  },
});

const questionSchema = new Schema(
  {
    theQuestion: {
      type: String,
      required: [true, "question_required"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "category_required"],
    },
    // responses: [{ type: responsesSchema }],
    responses: [
      {
        type: responseSchema,
        required: [true, "response_required"],
      },
    ],
  },

  {
    timestamps: true, // createdAt + updatedAt
  }
);

const Question = new mongoose.model("Question", questionSchema);
// creation d'une collection nommée 'users'

export default Question;
