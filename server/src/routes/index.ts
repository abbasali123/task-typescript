import express from "express";
import { userAuth } from "./userAuthRoutes";
import { taskRoutes } from "./taskRoutes";
import { auth } from "../middlewares/auth";

const routeFactory = (controllers: Record<string, Function>) => {
  const router = express.Router();

  router.use("/userAuth", userAuth(controllers.userAuth));
  router.use("/taskData", auth, taskRoutes(controllers.taskData));

  return router;
};

export { routeFactory };
