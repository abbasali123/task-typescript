import express from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends express.Request {
  user?: string | JwtPayload; // or any other type
}
