import express from "express";
const router = express.Router();
import { signUp } from "../controllers/authControllers.js";

router.route("/signup").get(signUp);

export default router;
