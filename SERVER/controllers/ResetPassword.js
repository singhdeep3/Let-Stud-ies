const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    const {email} = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Please register first!")
      return res.json({
        success: false,
        message: "Please register first!",
      });
    }

    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 100,
      },
      { new: true }
    );

    const url = `http://localhost:5173/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link:${url}`
    );

    return res.json({
      success: true,
      message: "Please check your mail.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.Please try again to reset your password",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password doesn't match.",
      });
    }

    const userDetails = User.findOne({ token: token });

    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid.",
      });
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.Please try again to reset your password",
    });
  }
};
