import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// app level middlewares
app.use(express.json({limit:"16kb"}));
app.use(cookieParser());

// routes



export default app;