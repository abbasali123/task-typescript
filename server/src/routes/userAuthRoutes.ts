import express from "express";

export const userAuth = (userAuthController: Record<string, any>) => {
  const userAuthRouter = express.Router();

  userAuthRouter.post("/login", userAuthController.login);
  userAuthRouter.post("/register", userAuthController.register);

  return userAuthRouter;
};
