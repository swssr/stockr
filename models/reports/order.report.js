const { Schema, model } = require("mongoose");
const { EmailSchema, AddressSchema } = require("../schemas");

const utils = require("../../utils/helpers");

const OrderSchema = new Schema({
  //TODO: Use uuid/order-id npm package as orderId
  orderNumber: String,
  customerDetails: {
    fullname: String,
    email: String,
    phone: String
  },
  items: [
    {
      barcode: String,
      count: {
        type: Number,
        default: 0
      },
      tax: {
        type: Number,
        default: 0
      },
      //To accomodate a future coupon system.
      soldFor: {
        type: Number,
        default: 0
      },
      subTotal: {
        type: Number,
        default: 0
      }
    }
  ],
  total: {
    type: Number,
    default: 0
  },
  date: { type: Date, default: `${Date.now()}` },
  isPaid: {
    type: Boolean,
    default: false
  },
  isCheckedOut: {
    type: Boolean,
    default: false
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  // shippingDetails: AddressSchema
  shippingDetails: String
});

module.exports = model("Orders", OrderSchema);
