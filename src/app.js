import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();

// app level middlewares
app.use(express.json({limit:"16kb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


// routes
app.use("/api/v1/user",userRouter);


export default app;