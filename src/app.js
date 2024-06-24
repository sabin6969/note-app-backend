import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import noteRouter from "./routes/note.route.js";
import { authRouter } from "./routes/auth.route.js";

const app = express();

// app level middlewares
app.use(express.json({limit:"16kb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public/temp"));


// routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/note",noteRouter);
app.use("/api/v1/auth",authRouter);


export default app;