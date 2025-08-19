const Razorpay = require("razorpay");
require("dotenv").config()

console.log("Loaded Razorpay key:", process.env.RAZORPAY_KEY);
exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
