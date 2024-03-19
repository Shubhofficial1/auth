import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const generateToken = async (userData) => {
  return jwt.sign(userData, process.env.JWT_ACCOUNT_ACTIVATION_SECRET, {
    expiresIn: "10d",
  });
};

export default generateToken;
