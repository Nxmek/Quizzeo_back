import { response } from "express";
import { USER_ROLE } from "../constants/user.constants.js";
import Question from "../models/questions.model.js";
import { formatQuestion } from "../utils/question.utils.js";

const createQuestion = async (theQuestion, category, responses) => {
  try {
    const question = new Question({
      theQuestion,
      category,
      responses: [
        {
          value: responses.resp1.value,
          good_one: responses.resp1.good_one,
        },
        {
          value: responses.resp2.value,
          good_one: responses.resp2.good_one,
        },
        {
          value: responses.resp3.value,
          good_one: responses.resp3.good_one,
        },
        {
          value: responses.resp4.value,
          good_one: responses.resp4.good_one,
        },
      ],
    });
    const createdQuestion = await question.save();
    return createdQuestion ? formatQuestion(createdQuestion) : null;
  } catch (e) {
    console.error(`question.dao - create : ${e.message}`);
    return null;
  }
};

const readAll = async () => {
  try {
    const questions = await Question.find();
    if (!questions) return null;
    return questions;
  } catch (e) {
    console.log(`question.dao - readAll : ${e.message}`);
    return null;
  }
};

const readQuestionByCategory = async (category) => {
  try {
    const questions = await Question.find({ category: category }).exec();
    // console.log(questions);
    if (!questions) return null;
    return questions;
  } catch (e) {
    console.error(`question.dao - readByCategory : ${e.message}`);
    return null;
  }
};
const readQuestionById = async (id) => {
  try {
    const question = await Question.findById({
      _id: id,
    }).exec();
    if (!question) return null;
    return question;
  } catch (e) {
    console.error(`question.dao - readByID : ${e.message}`);
    return null;
  }
};

const deleteQuestion = async (questionId) => {
  try {
    const questionToDelete = await Question.findById({
      _id: questionId,
    }).exec();
    questionToDelete.remove();
    return questionToDelete ? questionId : null;
  } catch (e) {
    console.error(`question.dao - delete : ${e.message}`);
    return null;
  }
};
const updateQuestion = async (theQuestion, category, responses, questionId) => {
  try {
    const questionToUpdate = await Question.findById(questionId);
    console.log(`je modifiie cette question : ${questionToUpdate}`);
    if (questionToUpdate.theQuestion === theQuestion) {
      questionToUpdate.category = category;
      questionToUpdate.responses = responses;
      console.log("===");
      const updatedQuestion = await questionToUpdate.save();
      return updatedQuestion;
    } else if (questionToUpdate.theQuestion !== theQuestion) {
      questionToUpdate.theQuestion = theQuestion;
      questionToUpdate.category = category;
      questionToUpdate.responses = responses;
      console.log("!==");

      const updatedQuestion = await questionToUpdate.save();
      return updatedQuestion;
    }

    const updatedQuestion = await questionToUpdate.save();
    return updatedQuestion;
  } catch (e) {
    console.error(`question.dao - update : ${e.message}`);
    return null;
  }
};

// questionToUpdate.updateOne({
//   theQuestion: theQuestion,
//   category: category,
//   responses: responses,
// });
export const QuestionDAO = {
  readQuestionByCategory,
  readQuestionById,
  updateQuestion,
  createQuestion,
  deleteQuestion,
  readAll,
};
