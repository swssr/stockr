const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  barcode: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  //TODO: Should be an array of strings
  images: [
    {
      type: String,
      required: true
    }
  ],
  quantity: {
    type: Number,
    default: 0
  }
});

module.exports = model("products", ProductSchema);
