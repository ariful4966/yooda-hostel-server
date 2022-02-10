const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const studentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    roll: Number,
    age: Number,
    class: {
        type: String,
        enum: ["six", "seven", "eight", "nine", "ten"]
    },
    hall: {
        type: String,
        enum: ["rokeya", "nazrul", "robindro"]
    },
    status: {
        type: String,
        enum: ["active", "inactive"]
    },
    
  },
  {
    timestamps: true,
  }
);
studentSchema.plugin(mongoosePaginate)

const Student = model("Student", studentSchema);

module.exports = Student;
