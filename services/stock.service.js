const StockModel = require("../models/stockItem.model");
const { removeDuplicates } = require("../utils/helpers");

module.exports = {
  async GetStock() {
    const Stock = await StockModel.find();

    return Stock.length ? Stock : ["Sorry no stock"];
  },
  async GetStockWhere(ItemPropArray) {
    try {
      const raw = await StockModel.find()
        .where("barcode")
        .in(ItemPropArray)
        .exec();

      const uniqueResults = removeDuplicates(raw, "barcode");
      console.log({ uniqueResults });
      //Elimating duplicates
      return uniqueResults;
    } catch (err) {
      console.error(err);
      return { error };
    }
  },
  AddStock(newStock) {
    newStock.forEach((item, index) => {
      const options = { upsert: true };
      const doc = {
        ...item,
        $inc: { quantity: item.count || 0 }
      };
      const criteria = { barcode: doc.barcode };
      StockModel.updateOne(criteria, doc, options)
        .then(v => {
          console.log(v);
          console.log("new document created/updated");
        })
        .catch(console.log);
      //Generate report
      return { index, doc, criteria };
    });
  },
  SetPromo(stockToUpdate) {
    async function setPromo(item) {
      await StockModel.updateOne(
        { _id: item._id },
        { onSale: true, promoPrice },
        { upsert: true }
      );
    }
    stockToUpdate.forEach(setPromo);
  },
  PurchaseStock(order) {
    //What happens when someone is buying.
    const StockPurchaseReport = {
      orderNumber: null,
      error: null,
      raw: null,
      items: []
    };
    StockPurchaseReport.orderNumber = order.orderNumber;
    //If order has been paid for decrease the stock.
    order.isPaid &&
      order.items.forEach(item => {
        const updatedItem = {
          coupon: item.coupon,
          soldFor: item.soldFor,
          $inc: {
            quantity: -1 * item.count,
            "metrics.orders": item.count
          }
        };

        StockModel.updateOne(
          { barcode: item.barcode },
          updatedItem,
          (err, raw) => {
            StockPurchaseReport.error = err;
            StockPurchaseReport.raw = err;
            StockPurchaseReport.items.push(updatedItem);
          }
        );
      });
    return StockPurchaseReport;
  }
};
