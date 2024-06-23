import express from "express";
import { createAccount } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

// unsecured routes
userRouter.route("/createAccount").post(upload.single("profileImage"),createAccount);


// secured routes

export default userRouter;