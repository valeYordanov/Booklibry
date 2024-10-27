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

    res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      token,
      country: createdUser.country,
      tel: createdUser.tel,
      username: createdUser.username,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt with email:", email); // Log the email being used for login
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found"); // Log if user is not found
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match"); // Log if the password is incorrect
      return res
        .status(401)
        .json({ success: false, message: "Password is not correct!" });
    }

    // Generate and return a token
    const token = createToken(user);
    res.status(201).json({
      userId: user.id,
      email: user.email,
      token,
      country: user.country,
      tel: user.tel,
      username: user.username,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const fetchUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params; // User ID from the URL
  const updatedData = req.body; // Fields to update

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Track if the email was updated
    const emailUpdated = updatedData.email && updatedData.email !== user.email;

    // Update user information
    Object.assign(user, updatedData);

    // Save the updated user details
    await user.save();

    // Generate a new token if the email was updated
    let token;
    if (emailUpdated) {
      token = createToken(user);
    } else {
      token = createToken(user); // Optionally create a token every time
    }

    res.status(200).json({
      uid: user._id,
      email: user.email,
      token: emailUpdated ? token : null, // Return new token only if email changed
      username: user.username,
      country: user.country,
      tel: user.tel,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next(new CustomError("Failed to update user", 500));
  }
};

const logout = (req, res) => {
  // Handle any necessary cleanup, like blacklisting a token
  res.status(200).json({ success: true, message: "Logged out successfully." });
};
exports.signUp = signUp;
exports.login = login;
exports.fetchUserById = fetchUserById;
exports.updateUser = updateUser;
exports.logout = logout;
