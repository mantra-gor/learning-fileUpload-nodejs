const express = require("express");
const router = express.Router();

const {
  imageUploadToCloudinary,
  videoUploadToCloudinary,
  imageSizeReducer,
  localFileUpload,
} = require("../controllers/fileUpload.controller.js");

// api routes

router.post("/imageUpload", imageUploadToCloudinary);
router.post("/videoUpload", videoUploadToCloudinary);
router.post("/imageSizeReduce", imageSizeReducer);
router.post("/localFileUpload", localFileUpload);

module.exports = router;
