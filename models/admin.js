const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 5
    },
    role:{
        type: String,
        enum: ["admin", "editor"]
    }
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;
