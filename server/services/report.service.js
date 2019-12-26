const { CustomerModel } = require("../models/user.model");
const { secret } = require("../config");
const { getTime } = require("order-id")(secret);
module.exports = {
  async LogCustomerPurchase(StockPurchaseReport) {
    try {
      const {
        customerDetails,
        orderNumber,
        total,
        items
      } = StockPurchaseReport;

      const doc = {
        $push: {
          orderHistory: {
            orderNumber,
            total,
            items
          }
        }
      };
      CustomerModel.updateOne(
        { email: customerDetails.email },
        doc,
        {
          upsert: true
        },
        (err, raw) => {
          console.log({
            from: "Update customer order history callback",
            raw,
            err
          });
        }
      );
      return `Order ${orderNumber} logged successfully.`;
    } catch (error) {
      return new Error("Logging user purchase failed. " + error);
    }
  }
};
