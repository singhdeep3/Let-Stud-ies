const Section = require("../models/Section");
const { uploadImageToCloud } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;

    const video = req.files.video;
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const uploadDetails = await uploadImageToCloud(
      video,
      process.env.FOLDER_NAME
    );

    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
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
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "Sub Section is created.",
      data:updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Sub Section is not created, try again later.",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId,subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);
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
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloud(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }
    await subSection.save();
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );
    return res.status(200).json({
      success: true,
      message: "Sub Section is updated.",
      data:updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Sub Section is not updated, try again later.",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.params;
    await SubSection.findByIdAndDelete(subSectionId);

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: subSectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Sub-Section deleted succesfully.",
      data:updatedSection
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Sub-Section is not deleted.",
    });
  }
};
