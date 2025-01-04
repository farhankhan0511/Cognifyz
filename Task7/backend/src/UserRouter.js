import express from "express";
import { currentuser, loginUser, logoutUser, registerUser } from "./UserController.js";
import { verifyJWT } from "./authmiddleware.js";




const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Logout Route
router.post("/logout", logoutUser);

//Register User
router.post("/register", registerUser);

router.get("/currentuser",verifyJWT,currentuser)





export default router;
