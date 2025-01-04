import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(cors({
  origin:process.env.CORS_ORIGIN,   
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb",extended:true}));
app.use(express.static("public"));
app.use(cookieParser());



app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

import userRouter from "./Routes/User.Routes.js";
import bookRouter from "./Routes/Book.routes.js";
import { getallpackages } from "./Controllers/User.controller.js";


app.use("/api/v1/user", userRouter);
app.use("/api/v1/booking", bookRouter);
app.get("/api/v1/all", getallpackages);

export default app;
