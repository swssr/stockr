const { Schema, model } = require("mongoose");
const { OrderSchema } = require("./schemas");
const {
  emailValidator,
  passwordValidator,
  phoneValidator
} = require("../utils/schema-validators");

//Default user schema definitions
const UserSchema = new Schema({
  email: Email,
  passwordHash: { type: String, required: true, validate: passwordValidator },
  //
  fullname: { type: String },
  phone: { type: String, validate: phoneValidator },
  active: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default:
      "https://cdn2.iconfinder.com/data/icons/green-2/32/expand-color-web2-23-128.png"
  },
  registered: {
    type: Date,
    default: Date.now()
  },
  visitCount: {
    type: Number,
    default: 0
  },
  searchLog: [String],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

/** Handy inheritance/extender function.
 * Creates new Schema then assigns the properties of parent schema.
 * */
const extend = (Schema, obj) =>
  new mongoose.Schema(Object.assign({}, Schema.obj, obj));

// Extended user types
const CustomerUserSchema = extend(UserSchema, {
  shippingAddress: AddressSchema,
  orderHistory: [OrderSchema]
});

const AdminUserSchema = extend(UserSchema, {
  isAdmin: {
    type: Boolean,
    default: true
  }
});

const Customers = model("customers", CustomerUserSchema);
const AdminUser = model("admins", AdminUserSchema);

module.exports = {
  Customers,
  AdminUser
};
