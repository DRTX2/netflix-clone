import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCockies } from "../utils/generateToken.js";

function isValidEmail(email) {
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return emailRegex.test(email);
}

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be  at least 8 characters",
      });

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername)
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email, // we don't need to add an trim method because mongoose  already does
      password: hashedPassword,
      username,
      image,
    });

    generateTokenAndSetCockies(newUser._id, res);
    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser._doc; // with _doc we get all the fields inside the entity stored with the mongodb document, after  the desestructuring we  take another  name for this field called now '_'

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        ...userWithoutPassword,
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ success: false, message: `Internal Serve Error` });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({email: email.toLowerCase()});
    if (!user)
      res.status(400).json({ success: false, message: "Unregistered email" });

    const isValidCredentials = await bcrypt.compare(password, user.password);
    if (!isValidCredentials)
      res.status(400).json({ success: false, message: "Incorrect password" });

    generateTokenAndSetCockies(user._id, res);
    
    res.status(200).json({ success: true, user: {...user._doc, password:""} });

  } catch (error) {
    const errMessage = `Error in login: ${error.message}`;
    console.error(errMessage);
    res.status(500).json({ success: false, message: errMessage });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logout successfull" });
  } catch (error) {
    const errMessage = `Error in logout: ${error.message}`;
    console.error(errMessage);
    res.status(500).json({ success: false, message: errMessage });
  }
}
