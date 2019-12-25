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
        .catch(console.error);
      //Generate report
      return { index, doc, criteria };
    });
  },
  async SetPromo(stockToUpdate) {
    async function setPromo(item) {
      await StockModel.updateOne(
        { barcode: item.barcode },
        { onSale: true, promoPrice },
        { upsert: true }
      );
    }
    stockToUpdate.forEach(setPromo);
  },
  PurchaseStock(customerOrderReport) {
    //What happens when someone is buying.
    let StockPurchaseReport;
    //If order hasn;t been paid
    if (!customerOrderReport.isPaid)
      return { message: "Please pay your invoice!" };
    //If customerOrderReport has been paid for decrease the stock.
    const updateItemFn = item => {
      /**If item is on sale set soldFor price to sale price.
       * !!important: Payment service should use the report generated from here.
       * */
      const soldFor = item.onSale ? item.promoPrice : item.soldFor;
      const updatedItem = {
        name: item.name,
        coupon: item.coupon,
        soldFor,
        $inc: {
          quantity: -1 * item.count,
          "metrics.orders": item.count
        }
      };

      StockModel.updateOne(
        { barcode: item.barcode },
        updatedItem,
        (err, raw) => {
          console.log("Updated", raw);
        }
      );
      customerOrderReport.items.forEach(updateItemFn);
      return {
        purchaseSlip: {
          ...customerOrderReport,
          items: customerOrderReport.items.map(v => ({
            count: v.count,
            name: v.name
          }))
        },
        inventoryReport: {
          orderNumber: customerOrderReport.orderNumber,
          stockRemoved: customerOrderReport.items.map(
            v => `${v.count} * ${v.name}`
          )
        }
      };
    };
  }
};
