import express from "express";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types";

const config = process.env;

export const auth = (
  req: IGetUserAuthInfoRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let token = req.headers.token;

    if (Array.isArray(token)) {
      token = token[0];
    }

    const tokenToVerify = token?.split("Bearer ")[1];

    if (!tokenToVerify) {
      return res.status(403).json({
        message: "A token is required for authentication",
      });
    }
    try {
      const decoded = jwt.verify(tokenToVerify, config.TOKEN_KEY ?? "");
      req.user = decoded;
      console.log(req.user);
    } catch (err) {
      return res.status(403).json({
        message: "Invalid Token",
      });
    }
  } catch {
    return res.status(403).json({
      message: "Error Occur while Acess Token",
    });
  }

  return next();
};
