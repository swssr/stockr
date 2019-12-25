const { Schema, model } = require("mongoose");
const { emailValidator } = require("../../utils/schema-validators");

const EmailSchema = new Schema({
  type: String
  // validate: emailValidator
});

const AddressSchema = new Schema({
  building: String,
  surburb: String,
  town: String,
  geolocation: String
});

// const OrderSchema = new Schema({
//   orderNumber: {
//     type: String,
//     required: true
//   },
//   customerEmail: EmailSchema,
//   ShippingAddress: AddressSchema,
//   orderDate: Date,
//   items: {
//     barcode: String,
//     quantity: {
//       type: Number,
//       default: 1
//     }
//   },
//   totalPrice: Number
// });

module.exports = {
  // OrderSchema,
  EmailSchema,
  AddressSchema
};
