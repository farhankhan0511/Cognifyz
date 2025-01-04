
import { Router } from "express";
import { booktour} from "../Controllers/Book.controller.js";

const router=Router();

router.route("/book/:id").post(booktour);


export default router;


