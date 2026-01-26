import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//  CREATE JWT TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// =======================
//  LOGIN USER
// =======================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // create token
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =======================
//  REGISTER USER
// =======================
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (min 8 chars)",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // create token
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { loginUser, registerUser };
