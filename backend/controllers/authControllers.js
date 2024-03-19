import dotenv from "dotenv";
dotenv.config();
import User from "../models/userModel.js";
import sendEmailWithNodemailer from "../helpers/email.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      error: "Email is taken",
    });
  }

  const token = await generateToken({ name, email, password });

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

const activateAccount = async (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION_SECRET,
      function (err, decodedToken) {
        if (err) {
          console.log("Jwt verify in account activation error", err);
          return res.status(401).json({
            error: "Expired Link, Signup again",
          });
        }

        const { name, email, password } = jwt.decode(token);
        const newUser = new User({
          name,
          email,
          password,
        });

        const createdUser = newUser.save();

        if (!createdUser) {
          return res.status(401).json({
            error: "Error Saving User in database , please try again",
          });
        }

        return res.status(200).json({
          message: "SignUp Success , please signin",
        });
      }
    );
  } else {
    return res.status(404).json({
      message: "Something went wrong. Try again",
    });
  }
};

export { signUp, activateAccount };
