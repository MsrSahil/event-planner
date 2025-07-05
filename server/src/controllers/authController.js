import User from "../models/userModel.js";
import bycrypt from "bcrypt";

export const RegisterUser = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      const error = new Error("All fields are required");
      error.status = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 409;
      return next(error);
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.status = 400;
      return next(error);
    }
    const isVerified = await bycrypt.compare(password, user.password);
    if (!isVerified) {
      const error = new Error("Invalid  username or password");
      error.status = 401;
      return next(error);
    }

    res.status(200).json({
      message: `welcome back ${user.fullName}`,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const LogoutUser = (req, res) => {};
export const UpdateUser = (req, res) => {};
