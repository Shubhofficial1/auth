import User from "../models/userModel.js";
import sendEmailWithNodemailer from "../helpers/email.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      error: "Email is taken",
    });
  }

  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION_SECRET,
    { expiresIn: "10m" }
  );

  const emailData = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "ACCOUNT ACTIVATION LINK",
    html: `
              <h1>Please use the following link to activate your account</h1>
              <p>http://localhost:3000/auth/activate/${token}</p>
              <hr />
              <p>This email may contain sensitive information</p>
              <p>http://localhost:3000</p>
          `,
  };

  await sendEmailWithNodemailer(req, res, emailData);
};

export { signUp };
