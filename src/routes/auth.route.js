import express from "express";
import { verifyAccessToken } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.route("/verifyAccesstoken").post(verifyAccessToken);

export {
    authRouter,
}