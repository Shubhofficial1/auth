import express from "express";
const router = express.Router();
import { signUp, activateAccount } from "../controllers/authControllers.js";
import userSignUpValidation from "../validator/authValidator.js";
import runValidation from "../validator/validator.js";

router.route("/signup").post(userSignUpValidation, runValidation, signUp);
router.route("/account-activation").post(activateAccount);

export default router;
