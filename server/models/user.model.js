const { Schema, model } = require("mongoose");

const {
  BaseOrderSchema,
  CustomerOrderModel
} = require("./reports/customerOrder.report");
const {
  emailValidator,
  passwordValidator,
  phoneValidator
} = require("../utils/schema-validators");

const { extendSchema } = require("../utils/helpers");

// Dumb subDocuments
const { AddressSchema, EmailSchema } = require("./schemas/index");

//Default user schema definitions
const UserSchema = new Schema({
  email: String,
  passwordHash: {
    type: String,
    required: true /** ,validate: passwordValidator */
  },
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
  lastVisit: {
    type: Date,
    default: Date.now().toString()
  },
  visitCount: {
    type: Number,
    default: 0
  },
  searchLog: [String],
  orderHistory: [BaseOrderSchema],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Extended user types
const CustomerUserSchema = extendSchema(UserSchema, {
  shippingAddress: AddressSchema,
  orderHistory: [
    {
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
    }
  ]
});

const AdminUserSchema = extendSchema(UserSchema, {
  isAdmin: {
    type: Boolean,
    default: true
  },
  role: { type: String, default: "Omniponent" }
});

const CustomerModel = model("Customers", CustomerUserSchema);
const AdminUserModel = model("Admins", AdminUserSchema);

module.exports = {
  CustomerModel,
  AdminUserModel
};
