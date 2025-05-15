const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties.",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.json(200).json({
      success: true,
      message: "Section created succesfully.",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log(error)
    return res.json(500).json({
      success: false,
      message: "Unable to create section.",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties.",
      });
    }

    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );

    return res.json(200).json({
      success: true,
      message: "Section is updated.",
    });
  } catch (error) {
    console.log(error)
    return res.json(500).json({
      success: false,
      message: "Section is not updated try again later.",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    await Section.findByIdAndDelete(sectionId);
    return res.json(200).json({
      success: true,
      message: "Section deleted succesfully.",
    });
  } catch (error) {
    console.log(error)
    return res.json(500).json({
      success: false,
      message: "Section is not deleted.",
    });
  }
};
