// app create
const express = require("express");
const app = express();

// PORT Find
require("dotenv").config();
const port = process.env.PORT || 5544;

// add middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// connect to db
const database = require("./config/database.config.js");
database.connect();

// connect to cloudinary
const cloudinary = require("./config/cloudinary.config.js");
cloudinary.cloudinaryConnect();

// mount api routes
const Upload = require("./routes/FileUpload.routes.js");
app.use("/api/v1/upload", Upload);

// starting the server
app.listen(port, () => {
  console.log("Server is Running at PORT: ", port);
});
