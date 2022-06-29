const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then((res) => {
    console.log("MongoDB connected.");
  })
  .catch((err) => {
    console.log(err);
  });
