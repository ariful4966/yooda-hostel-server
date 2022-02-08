const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    rollNumber: Number,
    age: Number,
    class: {
        type: String,
        enum: ["six", "seven", "eight", "nin", "ten"]
    },
    hall: {
        type: String,
        enum: ["rokeya", "nazrul"]
    },
    status: {
        type: String,
        enum: ["active", "inActive"]
    },
    
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;
