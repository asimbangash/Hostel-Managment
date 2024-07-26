const User = require("../models/user.model");
// const sgmail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

// sgmail.setApiKey();
// const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "harphostel@gmail.com",
    pass: "enwt vprr trkh thed",
  },
});

const resetpassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  // return;
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user !== null) {
    try {
      const msg = {
        from: "harphostel@gmail.com",
        to: `${email}`,
        subject: "Reset Your Password",
        text: `http://localhost:8080/up/${user._id}`,
      };
      transporter
        .sendMail(msg)
        .then(() => {
          res.status(200).json({ message: "Send successfully" });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({ message: "mail failed" });
        });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.status(500).json({ message: "You are not Registered" });
  }
};

module.exports = resetpassword;
