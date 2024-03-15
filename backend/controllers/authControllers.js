import User from "../models/userModel.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(409).json({
      error: "Email already exists",
    });
  }

  const newUser = User.create({
    name,
    email,
    password,
  });

  if (!newUser) {
    return res.status(200).json({
      error: "Invalid User data.",
    });
  }

  return res.status(200).json({
    message: "Signup completed , please login.",
  });
};

export { signUp };
