const subSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloud } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;

    const video = req.file.videoFile;
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const uploadDetails = await uploadImageToCloud(
      video,
      process.env.FOLDER_NAME
    );

    const subSectionDetails = await subSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    );

    return res.json(200).json({
      success: true,
      message: "Sub Section is created.",
      updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({
      success: false,
      message: "Sub Section is not created, try again later.",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const subSection = await SubSection.findById(sectionId);

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }
    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.file.videoFile;
      const uploadDetails = await uploadImageToCloud(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }
    await subSection.save();

    return res.json(200).json({
      success: true,
      message: "Sub Section is updated.",
      updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({
      success: false,
      message: "Sub Section is not updated, try again later.",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.params;
    await subSection.findByIdAndDelete(subSectionId);

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: subSectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    );
    return res.json(200).json({
      success: true,
      message: "Sub-Section deleted succesfully.",
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({
      success: false,
      message: "Sub-Section is not deleted.",
    });
  }
};
