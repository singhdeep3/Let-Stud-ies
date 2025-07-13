const { mongoose } = require("mongoose");
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const pheonixUser = require("../models/User");
const { uploadImageToCloud } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

    const id = req.user.id;

    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields required.",
      });
    }

    const userDetails = await pheonixUser.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile is not updated.",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const idupdate = await mongoose.Types.ObjectId(id);
    const userDetails = pheonixUser.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await Course.updateMany(
      { _id: { $in: userDetails.courses } },
      {
        $pull: {
          studentsEnrolled: idupdate,
        },
      }
    );
    await Profile.findOneAndDelete({ _id: userDetails.additionalDetails });

    await pheonixUser.findOneAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "User deleted succesfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted!",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const allUserDetails = await pheonixUser.find({});

    if (!allUserDetails) {
      return res.json({
        success: false,
        message: "No User exist till now",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Profiles are returned.",
      data: allUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "All Profiles cannot be fetched :-(",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const enrolledCourses = await pheonixUser.find({}, { courses: true })
      .populate("courses")
      .exec();

    if (!enrolledCourses) {
      return res.json({
        success: false,
        message: "No course is enrolled yet :-(",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Enrolled courses are returned.",
      data: enrolledCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "All Enrolled courses cannot be fetched :-(",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const id = req.user.id;
    const dp = req.files.displayPicture;
    const dpupload = await uploadImageToCloud(dp, process.env.FOLDER_NAME);
    await pheonixUser.findByIdAndUpdate(
      { id },
      { image: dpupload.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Display picture changed.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Display picture cannot be changed at this moment:-(",
    });
  }
};


exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}