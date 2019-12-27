const { model } = require("mongoose");
const { BaseOrderSchema } = require("./order.report");
const { extendSchema } = require("../../utils/helpers");
/**
 * TODO: Stretch goal. find a comvinient way and less finicky way to store supplier information, maybe store the supplierId for every stock addition.
 */
const AddStockReport = extendSchema(BaseOrderSchema, {
  totalItems: Number,    
  optimalReturn: Number,
  lastStocked: {
    items: [
      {
        barcode: String,
        supplierPrice: {
          type: Number,
          default: 0
        },
        count: {
          type: Number,
          default: 0
        },
        boughtFor: {
          type: Number,
          default: 0
        },
        ourPrice: {
          type: Number,
          default: 0
        }
      }
    ],
    byAdmin: String,
    date: Date
  }
});

module.exports = {
  StockAddReportModel: model("StockAddReport", AddStockReport)
};
