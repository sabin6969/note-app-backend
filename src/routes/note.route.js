import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createNote } from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.route("/createNote").post(authMiddleware,createNote);

export default noteRouter;