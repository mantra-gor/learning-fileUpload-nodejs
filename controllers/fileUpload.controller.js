const File = require("../models/File.model.js");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    // fetch the file
    const file = req.files.file;
    console.log("File", file);
    let path =
      __dirname + "/files/" + Date.now() + "." + file.name.split(".")[1];
    file.mv(path, (err) => {
      console.log(err);
    });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully in Local Server",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error, While File Upload",
      error: error,
    });
  }
};

function isFileTypeSupported(fileType, supportedFileType) {
  return supportedFileType.includes(fileType);
}

async function uploadToCloudinaty(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUploadToCloudinary = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    // validation for file type
    const supportedFileType = ["jpeg", "jpg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedFileType)) {
      return res.status(415).json({
        success: false,
        message: "Only JPG, JPEG and PNG files are supported.",
      });
    }

    // now when file type is correct
    const response = await uploadToCloudinaty(file, "Codehelp");
    console.log(response);

    // save entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    // send res to user
    return res.status(200).json({
      success: true,
      message: "File Uploaded to Cloudinary",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error, While Image Upload to Cloudinary",
      error: error.message,
    });
  }
};

exports.videoUploadToCloudinary = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.videoFile;

    if (!req.files || !req.files.videoFile) {
      return res.status(400).json({
        success: false,
        message: "No video file uploaded.",
      });
    }

    // validation for file type
    const supportedFileType = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    // TODO: Add a upper limit of 5mb size of the video
    if (!isFileTypeSupported(fileType, supportedFileType)) {
      return res.status(415).json({
        success: false,
        message: "Only MP4 and MOV files are supported.",
      });
    }

    // now when file type is correct
    const response = await uploadToCloudinaty(file, "Codehelp");
    console.log(response);

    // save entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });

    // send res to user
    return res.status(200).json({
      success: true,
      message: "File Uploaded to Cloudinary",
      videoUrl: response.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error, While Video Upload to Cloudinary",
      error: error.message,
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    // validation for file type
    const supportedFileType = ["jpeg", "jpg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedFileType)) {
      return res.status(415).json({
        success: false,
        message: "Only JPG, JPEG and PNG files are supported.",
      });
    }

    // TODO: By changing height and width change the file size

    // now when file type is correct
    const response = await uploadToCloudinaty(file, "Codehelp", 10);
    console.log(response);

    // save entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    // send res to user
    return res.status(200).json({
      success: true,
      message: "File Uploaded to Cloudinary",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error, While Reducing Size",
      error: error.message,
    });
  }
};
