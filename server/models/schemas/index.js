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
module.exports = {
  EmailSchema,
  AddressSchema
};
