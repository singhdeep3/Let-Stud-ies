const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const pheonixUser = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");
const crypto = require("crypto");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" });
  }

  let total_amount = 0;

  for (const course_id of courses) {
    let course;
    try {
      // Find the course by its ID
      course = await Course.findById(course_id);

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" });
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }

      // Add the price of the course to the total amount
      total_amount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
  }
};

exports.verifyPayment = async (req, res) => {
  console.log("req.body is",req.body)
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  )return res.status(400).json({ success: false, message: "Payment Failed!" });

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
    console.log(expectedSignature, "=",razorpay_signature)

  if (expectedSignature === razorpay_signature) {
    try {
      for (const courseId of courses) {
        const enrolledCourse = await Course.findByIdAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );

        if (!enrolledCourse){
          return res
            .status(500)
            .jon({ success: false, message: "Courses Not Found :-(" });
        }
            console.log("Inside payment.js before course progress")
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        });

        console.log("Inside payment.js pushing course in user")

        const enrolledStudent = await pheonixUser.findByIdAndUpdate(
          {_id: userId},
          { $push: { courses: courseId, courseProgress: courseProgress._id } },
          { new: true }
        );

        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName}`
          )
        );
      }

      return res
        .status(200)
        .json({ success: true, message: "Payment Verified." });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: error.message });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;
  console.log("inside of Payment.js")
  console.log(orderId)
  console.log(paymentId)
  console.log(amount)
  if (!orderId || !paymentId || !amount || !userId)
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields." });
  try {
    const enrolledStudent = await pheonixUser.findById(userId);
    await mailSender(
      enrolledStudent.email,
      `Payment Successfull`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("Error in payment mail", error);
    returnres
      .status(500)
      .json({ success: false, message: "Could not send an email." });
  }
};
