import asyncHandler from "express-async-handler";
import User from "../models/Users.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
//@desc      Auth user & get token
//@route      POST/api/users/login
//@access      Public
const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      isBarista: user.isBarista,
      isClient: user.isClient,
      isVipClient: user.isVipClient,
      numberOfCups: user.numberOfCups,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullname: name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      isBarista: user.isBarista,
      isVipClient: user.isVipClient,
      isClient: user.isClient,
      numberOfCups: user.numberOfCups,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      isBarista: user.isBarista,
      numberOfCups: user.numberOfCups,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullname = req.body.name || user.fullname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.fullname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isBarista: updatedUser.isBarista,
      isVipClient: updatedUser.isVipClient,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.fullname = req.body.name || user.fullname;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isBarista = req.body.isBarista;
    user.isVipClient = req.body.isVipClient;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.fullname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isBarista: updatedUser.isBarista,
      isVipClient: updatedUser.isVipClient,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
