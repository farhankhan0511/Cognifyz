import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import rateLimit from "express-rate-limit"; // Import rate limiter
import cors from "cors"; // Import cors
import UserRouter from "./UserRouter.js";
import { initializePassport } from "./passport-config.js";

dotenv.config();

const app = express();

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
    message: {
        status: 429,
        error: "Too many requests, please try again later",
    },
    headers: true,
});

// Middlewares
app.use(cookieParser());
app.use(
    cors({
        
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));

// Initialize Passport
initializePassport.initialize();
app.use(passport.initialize());

// Apply rate limiter to all requests
app.use(apiLimiter);

// Routes
app.use("/api", UserRouter);

export default app;
