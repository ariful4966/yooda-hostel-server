const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

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
foodItemSchema.plugin(mongoosePaginate)

const FoodItem = model("FoodItem", foodItemSchema);

module.exports = FoodItem;
