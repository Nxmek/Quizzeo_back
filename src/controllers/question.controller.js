import { QuestionDAO } from "../daos/question.dao.js";
import Question from "../models/questions.model.js";

const read = async (req, res) => {
  const questions = await QuestionDAO.readAll();
  if (!questions)
    return res.status(400).json({ message: "cant_get_questions" });

  res.status(200).json({ message: "ok", questions });
};

const readByCategory = async (req, res) => {
  const questionCategory = req.params.category;

  const questions = await QuestionDAO.readQuestionByCategory(questionCategory);
  // console.log("questions ", questions);

  if (!questions)
    return res.status(400).json({ message: "cant_get_questions" });

  res.status(200).json({ message: "ok", questions });
};
const readById = async (req, res) => {
  const questionId = req.params.id;

  const question = await Question.findById(questionId);
  if (!question)
    return res.status(400).json({ message: `cannot_find_question` });

  const readingQuestion = await QuestionDAO.readQuestionById(questionId);
  if (!readingQuestion)
    return res.status(400).json({ message: `cannot_read_question` });

  res.status(200).json({
    message: `question with id ${questionId} was successfully read`,
    question: readingQuestion,
  });
};

const questionCreation = async (req, res) => {
  const theQuestion = req.body.question;
  const category = req.body.category;
  const responses = req.body.responses;
  const question = await QuestionDAO.createQuestion(
    theQuestion,
    category,
    responses
  );

  if (!question)
    return res.status(403).json({ message: `question_already_exist` });

  res.status(201).json({ message: "question_created", question });
};

const deleteOne = async (req, res) => {
  const questionId = req.params.id;

  const question = await Question.findById(questionId);
  if (!question)
    return res.status(400).json({ message: `cannot_find_question` });

  const deletedQuestion = await QuestionDAO.deleteQuestion(questionId);
  if (!deletedQuestion)
    return res.status(400).json({ message: `cannot_delete_question` });

  res.status(200).json({
    message: `question with id ${questionId} was successfully deleted`,
    question: deletedQuestion,
  });
};
const questionUpdate = async (req, res) => {
  const questionId = req.params.id;
  const theQuestion = req.body.theQuestion;
  const category = req.body.category;
  const responses = req.body.responses;
  const updatedQuestion = await QuestionDAO.updateQuestion(
    theQuestion,
    category,
    responses,
    questionId
  );
  if (!updatedQuestion) return res.status(403).json({ message: `error` });

  res.status(201).json({ message: "question_updated", updatedQuestion });
};
export const QuestionController = {
  questionCreation,
  readByCategory,
  questionUpdate,
  deleteOne,
  readById,
  read,
};
