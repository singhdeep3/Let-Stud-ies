const { mongoose } = require("mongoose");
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const pheonixUser = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloud } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDur");
const RatingAndReview = require("../models/RatingAndReview");

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body
    const id = req.user.id

    // Find the profile by id
    const userDetails = await pheonixUser.findById(id)
    const profile = await Profile.findById(userDetails.additionalDetails)

    const user = await pheonixUser.findByIdAndUpdate(id, {
      firstName,
      lastName,
    })
    await user.save()

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile
    await profile.save()

    // Find the updated user details
    const updatedUserDetails = await pheonixUser.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id
    console.log(id)
    const ratingId = new mongoose.Types.ObjectId(id);
    const user = await pheonixUser.findById({ _id: id })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    })
    for (const courseId of user.courses) {
      const res = await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id}},
        { new: true }
      );
     const query =  await RatingAndReview.deleteOne().where("user").equals(id);
     console.log(query)

    }
    // Now Delete User
    await pheonixUser.findByIdAndDelete({ _id: id })
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
    await CourseProgress.deleteMany({ userId: id })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" })
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
    const userId = req.user.id;
    let userDetails = await pheonixUser
      .findOne({
        _id: userId,
      })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      // if (courseProgressCount?.completedVideos.length > 0) {
        courseProgressCount = courseProgressCount?.completedVideos.length;
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100;
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2);
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier;
        }
      // }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const id = req.user.id;
    const dp = req.files.displayPicture;
    const dpupload = await uploadImageToCloud(dp, process.env.FOLDER_NAME,1000,1000);
    console.log(dpupload)
    const updatedProfile = await pheonixUser.findByIdAndUpdate(
      { _id:id },
      { image: dpupload.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Display picture changed.",
      data:updatedProfile
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
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
