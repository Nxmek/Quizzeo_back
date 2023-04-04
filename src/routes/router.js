import { sanitizeMiddleware } from "../middlewares/sanitize.middleware.js";
import initUsersRoutes from "./users.routes.js";
import initQuestionsRoutes from "./questions.routes.js";

const initRoutes = (app) => {
  initUsersRoutes(app, sanitizeMiddleware);
  initQuestionsRoutes(app, sanitizeMiddleware);
};

export default initRoutes;
