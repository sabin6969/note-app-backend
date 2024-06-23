import express from "express";
import { createAccount, login, logout } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

// unsecured routes
userRouter.route("/createAccount").post(upload.single("profileImage"),createAccount);
userRouter.route("/login").post(login);


// secured routes
userRouter.route("/logout").post(authMiddleware,logout);

export default userRouter;