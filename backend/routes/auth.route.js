import express from "express";

import { login, logout, signup } from "../controllers/auth/auth.controller.js";


export const authRouter = express.Router();

authRouter.get("/signup", signup);
authRouter.get("/login", login);
authRouter.get("/logout", logout);
