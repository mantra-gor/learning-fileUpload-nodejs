const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connection Successful ✅"))
    .catch((error) => {
      console.log("Connection to DB Failed ❌");
      console.error("Error: ", error);
      process.exit(1);
    });
};
