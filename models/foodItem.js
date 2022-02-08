const { Schema, model } = require("mongoose");

const foodItemSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FoodItem = model("FoodItem", foodItemSchema);

module.exports = FoodItem;
