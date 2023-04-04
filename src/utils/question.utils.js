export const formatQuestion = (question) => {
  return {
    id: question._id,
    theQuestion: question.theQuestion,
    category: question.category,
  };
};

// export const format = (users) => {
//   return users.map(formatUser);
// };
