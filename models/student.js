const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    roll: {
      type: Number,
      trim: true,
      unique: true,
    },
    age: {
      type: Number,
      trim: true,
      min: 5,
      max: 25,
    },
    hall: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;
