import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initUsersRoutes = (app, sm) => {
  const router = Router();
  router.get("/read", sm, UserController.read);
  // router.get("/read/:id", sm, UserController.readUserById);
  router.get("/readById", sm, jwtMiddleware, UserController.readUserById);

  router.post("/sign-up", sm, UserController.signUp);
  router.post("/sign-in", sm, UserController.signIn);

  app.use("/users", router);
};

export default initUsersRoutes;
