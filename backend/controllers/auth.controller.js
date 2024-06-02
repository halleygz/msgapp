import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ error: `password don't match` });
    }
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ error: `user already exists` });
    }
    // bcrypt hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //profile pic
    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      confirmPassword,
      gender,
      profilePic: gender === "male" ? boyProfile : girlProfile,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: `successfuly signed up`,
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: `invalid user data` });
    }
  } catch (error) {
    res.status(500).json({ error: `internal server error` });
    console.log(`error occured during signup`, error.message);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const passCheck = await bcrypt.compare(password, user?.password || "");
    if (!user || !passCheck) {
      res.status(401).json({ message: "Invalid cridentials" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      message: `successfuly logged in up`,
      _id: user._id,
      fullName: user.fullName,
      gender: user.gender,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: `internal server error` });
    console.log(`error occured during login`, error.message);
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `logout sucess!!` });
  } catch (error) {
    res.status(500).json({ error: `internal server error` });
    console.log(`error occured during logou`, error.message);
  }
};
