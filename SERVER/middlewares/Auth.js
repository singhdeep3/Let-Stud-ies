const jwt = require("jsonwebtoken");
require("dotenv").config();

// Check Authorization
exports.auth = async (req, res, next) => {
  try {
    // Extract the token
    const token = req.header("Authorization").replace("Bearer ", "") || req.cookies.token ||  req.body.token ;


    // Check if token is present?
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing!",
      });
    }

    // Verify if token is valid or not.
    try {
      const decode =  jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid!",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong!!!",
    });
  }
};

// Check isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "student") {
      return res.status(401).json({
        success: false,
        message: "Protected route only for Student.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified,try again.",
    });
  }
};

// Check isAdmin

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Protected route only for Admin.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified,try again.",
    });
  }
};

// check isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "instructor") {
      return res.status(401).json({
        success: false,
        message: "Protected route only for Instructor.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified,try again.",
    });
  }
};
