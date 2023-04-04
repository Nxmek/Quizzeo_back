export const formatUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    password: user.password,
    role: user.role,
  };
};

export const formatUsers = (users) => {
  return users.map(formatUser);
};
