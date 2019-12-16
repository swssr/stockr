import { Schema, model } from "mongoose";


const OrderSchema = new Schema({
  orderNumber: {
    type: Number,
    unique: true
  },
  customerEmail: {
    type: String,
    required: true,
    validate: emailValidator
  },
  orderDate: Date,
  items: {
    barcode: String,
    quantity: {
      type: Number,
      default: 1
    }
  },
  totalPaper: Number
});

module.exports = {
  OrderSchema
};
