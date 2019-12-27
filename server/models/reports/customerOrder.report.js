const { Schema, model } = require("mongoose");
const { EmailSchema, AddressSchema } = require("../schemas");

const { extendSchema } = require("../../utils/helpers");

const BaseOrderSchema = new Schema({
  orderNumber: String,
  items: [
    {
      barcode: String,
      name: String,
      price: Number,
      count: Number,
      subTotal: Number
    }
  ],
  total: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now().toString()
  }
});

const OrderSchema = extendSchema(BaseOrderSchema, {
  //TODO: Use uuid/order-id npm package as orderId ✔
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
  deliverStatus: {
    type: Number,
    default: 0,
    validate: {
      //0 is order seen, 1 is pending delivery and 2 is delivered.
      validator: value => value == 0 || value == 1 || value == 2,
      message: "Delivery status can only be number 0, 1, or 2."
    }
  },
  // Shipping address will be one of known branches.
  internalTransfer: {
    type: Boolean,
    default: false
  },
  shippingDetails: {
    building: String,
    surburb: String,
    town: String,
    geolocation: String
  }
});

module.exports = {
  BaseOrderSchema,
  CustomerOrderModel: model("Orders", OrderSchema)
};
