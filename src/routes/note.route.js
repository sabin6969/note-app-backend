import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, updateNote } from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.route("/createNote").post(authMiddleware,createNote);
noteRouter.route("/deleteNote/:noteId").delete(authMiddleware,deleteNote);
noteRouter.route("/updateNote/:noteId").patch(authMiddleware,updateNote);
export default noteRouter;