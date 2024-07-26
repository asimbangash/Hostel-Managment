const { genAccessToken, genRefreshToken } = require("../middleware/gentoken");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const Booking = require("../models/bookHostel.model");
const Joi = require("joi");
const path = require("path");
const bcrypt = require("bcrypt");
const axios = require("axios");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string(),
});

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error, value } = schema.validate({ name, email, password });

  if (error) {
    return res.status(403).send(error);
  }
  console.log(value);
  if (value) {
    let { name, email, password } = value;

    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json("All fields are required");
    }

    try {
      const existedUser = await User.findOne({ email });

      if (existedUser) {
        return res.status(409).json("user already exist");
      }

      const user = await User.create({
        name,
        email,
        password,
      });
      let accessToken = genAccessToken(user);
      let refreshToken = genRefreshToken(user);

      return res.status(201).json({
        success: true,
        accessToken,
        refreshToken,
        role: user.role,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json("Internal Server Error");
    }
  }
};

const googleLogin = async (req, res) => {
  let token = req.body.code.access_token;
  const userInfo = await axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

  const firstName = userInfo?.given_name;
  const lastName = userInfo?.family_name;
  const email = userInfo?.email;

  const name = firstName + lastName;

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      let accessToken = genAccessToken(existedUser);
      let refreshToken = genRefreshToken(existedUser);
      return res.status(201).json({
        success: true,
        accessToken,
        refreshToken,
        role: existedUser.role,
        email: existedUser.email,
      });
    }

    const user = await User.create({ name, email });
    let accessToken = genAccessToken(user);
    let refreshToken = genRefreshToken(user);

    return res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      role: user.role,
      email: email,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(password);
    if (email) {
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        let istrue = await existedUser.isPasswordCorrect(password);
        if (!istrue) {
          return res.status(401).send("Your password is not correct");
        }
        let accessToken = genAccessToken(existedUser);
        let refreshToken = genRefreshToken(existedUser);
        return res.status(201).json({
          success: true,
          accessToken,
          refreshToken,
          role: existedUser.role,
        });
      }
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  // res.send(req.user)
  const { id } = req.user;
  try {
    const user = await User.findOne({ _id: id });
    const userobj = user.toObject();
    // delete userobj['password']
    res.status(200).json(userobj);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const getUsers = async (req, res) => {
  // res.send(req.user)
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { firstname, lastname, email, phoneno, currentPass, newPass, image } =
    req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ _id: id });

    // Check if current password is correct before updating the password
    if (currentPass && newPass) {
      const isMatch = await user.isPasswordCorrect(currentPass);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }
      user.password = newPass;
    }

    // Update other fields
    if (firstname) user.name = firstname + " " + lastname;
    if (email) user.email = email;
    if (phoneno) user.phoneNo = phoneno;
    if (image) user.profileImage = image;

    // Save the updated user
    await user.save();

    const userobj = user.toObject();
    delete userobj["password"]; // Remove password from the response object

    res.status(200).json(userobj);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};
const updateUserPass = async (req, res) => {
  const { id, password } = req.body;
  try {
    const hashpass = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { _id: id },
      { password: hashpass },
      {
        new: true,
        runValidator: true,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneno, city, state } = req.body;
  try {
    const user = await User.findOne({ _id: id });

    // Update other fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneno) user.phoneNo = phoneno;
    if (city) user.city = city;
    if (state) user.state = state;

    // Save the updated user
    await user.save();

    const userobj = user.toObject();
    delete userobj["password"]; // Remove password from the response object

    res.status(200).json(userobj);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error deleting User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const uploadImage = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);

    // Save the uploaded file path to the user profile
    user.profileImage = req.file.filename;
    await user.save();

    res.status(200).json({ success: true, profileImage: user.profileImage });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const removeImage = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if (!user.profileImage) {
      return res.status(400).json({ message: "No profile image to remove" });
    }

    // let p = path.resolve('..', 'backend', 'uploads', user.profileImage);
    // console.log(p);
    // return console.log(user)

    // Remove the image file from the filesystem
    // fs.unlink(path.resolve('..', 'backend', 'uploads', user.profileImage), (err) => {
    //   if (err) {
    //     return res.status(400).json(err)
    //   }
    // });

    user.profileImage = null;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getUserBooking = async (req, res) => {
  const { id } = req.user;

  const info = await Booking.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(id) }, // Match bookings related to the specific user
    },
    {
      $lookup: {
        from: "users", // The collection to join with
        localField: "userId", // Field from the bookings collection
        foreignField: "_id", // Field from the users collection
        as: "userDetails", // Output array field
      },
    },
    {
      $unwind: "$userDetails", // Deconstruct the array to objects
    },
    {
      $lookup: {
        from: "posthostels", // The collection to join with
        localField: "hostelId", // Field from the bookings collection
        foreignField: "_id", // Field from the users collection
        as: "hostelDetails", // Output array field
      },
    },
    {
      $unwind: "$hostelDetails", // Deconstruct the array to objects
    },
  ]);

  console.log(info);

  res.status(200).json(info);
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  getUserBooking,
  updateUser,
  uploadImage,
  removeImage,
  updateUserById,
  updateUserPass,
  googleLogin,
};
