const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let user = await User.create({
      username,
      email,
      password,
    });

    res
      .status(201)
      .json({ success: true, message: "User is register..", user: user });
  } catch (error) {
    res.status(404).json(error);
  }
};

let OTP = Math.floor(Math.random() * 10000);

const Login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user) {
      if (user.email == email && user.password == password) {
        let token = jwt.sign({ _id: user.id }, "segeehtrtef");
        console.log(token);
        res
          .status(200)
          .cookie("token", token)
          .send(
            `User is Login Sucessfull username ${user.username} and OTP is ${OTP}`
          );
      } else {
        res
          .status(400)
          .json({ sucess: false, message: "Email Or Password is incorect.." });
      }
    } else {
      res.status(404).json({ success: false, message: "User not founde" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Profile = (req, res) => {
  try {
    if (req.params.otp == OTP) {
      res.send("Home page");
    }
    else{
        res.json({ success: false, message: "OPT does not match" })
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const ForgotPassword = async (req, res) => {
  try {
    let { email, newpassword, confirmpassword } = req.body;
    let user = await User.findOne({ email: email });

    if (newpassword == confirmpassword) {
      user.password = newpassword;
      await user.save();
      res.status(200).json({ success: true, message: "Password is Changed" });
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: "Confirm password and new password is not match",
        });
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
};

module.exports = { Register, Login, Profile, ForgotPassword };
