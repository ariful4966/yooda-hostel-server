const { Schema, model } = require("mongoose");

const distributionSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    date: {
      type: Date,
      default: new Date(),
    },
    shift: Boolean,
    status: {
      type: String,
      enum: ["done", "panding", "process"],
    },
    foodItemList: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const Distribution = model("Distribution", distributionSchema);

module.exports = Distribution;
