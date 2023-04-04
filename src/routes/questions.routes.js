import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";
import { QuestionController } from "../controllers/question.controller.js";

const initUsersRoutes = (app, sm) => {
  const router = Router();
  router.post(
    "/create",
    jwtMiddleware,
    sm,
    QuestionController.questionCreation
  );
  router.put(
    "/update/:id",
    jwtMiddleware,
    sm,
    QuestionController.questionUpdate
  );
  router.delete("/delete/:id", jwtMiddleware, sm, QuestionController.deleteOne);
  router.get(
    "/read/:category",
    jwtMiddleware,
    sm,
    QuestionController.readByCategory
  );
  router.get("/readById/:id", jwtMiddleware, sm, QuestionController.readById);
  router.get("/read", jwtMiddleware, sm, QuestionController.read);

  app.use("/question", router);
};

export default initUsersRoutes;
