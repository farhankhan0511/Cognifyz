import { Router } from "express";
import { getcurrentUser, logout,registerUser, userlogin } from "../Controllers/User.controller.js";



const router=Router()

router.route("/signup").post(registerUser)
router.route("/signin").post(userlogin)
router.route("/logout").get(logout)
router.route("/currentuser").get(getcurrentUser)





export default router;