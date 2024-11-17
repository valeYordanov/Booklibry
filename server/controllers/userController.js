const User = require("../models/User");
const { createToken } = require("../token-util/jwt");
const CustomError = require("../util/customError");

const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  const { username, email, password, country, tel } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new CustomError("Email is already in use!", 422));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      username,
      email,
      password: hashedPassword,
      country,
      tel,
      books: [],
    });

    await createdUser.save();
    const token = createToken(createdUser);

    return res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      token,
      country: createdUser.country,
      tel: createdUser.tel,
      username: createdUser.username,
    });
  } catch (error) {
    return next(error); 
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Password is not correct!" });
    }

    const token = createToken(user);
    return res.status(200).json({
      userId: user.id,
      email: user.email,
      token,
      country: user.country,
      tel: user.tel,
      username: user.username,
    });
  } catch (error) {
    console.error("Login error:", error);
    return next(error); 
  }
};

const fetchUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return next(error); 
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const emailUpdated = updatedData.email && updatedData.email !== user.email;
    Object.assign(user, updatedData);
    await user.save();

    const token = emailUpdated ? createToken(user) : null;

    return res.status(200).json({
      uid: user._id,
      email: user.email,
      token,
      username: user.username,
      country: user.country,
      tel: user.tel,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return next(error); 
  }
};

const logout = (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully." });
};

exports.signUp = signUp;
exports.login = login;
exports.fetchUserById = fetchUserById;
exports.updateUser = updateUser;
exports.logout = logout;