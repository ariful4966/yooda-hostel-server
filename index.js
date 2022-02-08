require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb://localhost:27017/yoodaHostel")
  .then(() => {
    console.log("Database has been connect");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
