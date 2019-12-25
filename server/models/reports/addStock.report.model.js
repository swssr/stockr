import mongoose from "mongoose";

const AddStockReport = mongoose.Schema({
  totalItems: Number,
  optimalReturn: Number,
  lastStocked: {
    items: [{
      barcode: String,
      supplierPrice: Number,
      count: Number,
    }],
    byAdmin: String,
    date: Date
  }
});

module.exports = mongoose.model("Reports", AddStockReport);