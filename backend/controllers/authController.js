const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

const token = generateToken(user._id);

res.status(201).json({
  success: true,
  message: "User Registered Successfully",
  token,

  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
  success: true,
  message: "Login Successful",
  token,

  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

  } catch (error) {
  console.error("REGISTER ERROR:", error);

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};

module.exports = {
  registerUser,
  loginUser,
};