const { Schema, model } = require("mongoose");

// const { orderValidator } = require("../utils/schema-validators");

const StockItemSchema = new Schema({
  barcode: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  /**Here comes the pricing logic
   * promoPrice - limited time offer, null default
   * soldFor - price paid by customer, null default
   *
   * */
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  supplierPrice: {
    type: Number,
    default: 0
  },
  onSale: {
    type: Boolean,
    default: false
  },
  promoPrice: {
    type: Number,
    required: false,
    default: null,
    min: 0
  },
  //TODO: Should be an array of strings
  images: [
    {
      type: String,
      default:
        "http://www.justinvanbreda.com/wp-content/themes/labomba/images/wc-placeholder-cart.gif"
    }
  ],
  quantity: {
    type: Number,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
    // validate: {
    //   // validator: () => !!this.quantity,
    //   message: "Cannot feature Product out of stock! - fromDb"
    // }
  },
  metrics: {
    orders: {
      type: Number,
      default: 0,
      // validate: orderValidator,
      max: this.quantity
    },
    ratings: {
      type: Number,
      default: 1
    }
  },
  checkedOut: {
    type: Boolean,
    default: false
  }
});

module.exports = model("StockItems", StockItemSchema);
