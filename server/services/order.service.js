const {
  CustomerOrderModel
} = require("../models/reports/customerOrder.report");
const { secret } = require("../config");
const orderid = require("order-id")(secret);

const StockModel = require("../models/stockItem.model");
const StockService = require("../services/stock.service");
const PaymentService = require("../services/payment.service");
const ReportingService = require("../services/report.service");

const { calcTotal } = require("../utils/helpers");

module.exports = {
  async GetOrderWhere(criteria) {
    return await CustomerOrderModel.find(criteria);
  },
  async GetOrders() {
    let response = await CustomerOrderModel.find();
    return response;
  },
  async CreateOrder(cart) {
    // const criteria = { orderNumber: orderid.generate(Date.now()) };
    const cartItemBarcodes = cart.items.map(item => item.barcode);
    const orderNumber = orderid.generate(Date.now());
    const itemsBought = await StockService.GetStockWhere(cartItemBarcodes);

    const orderItems = itemsBought.map((item, index) => {
      const cartItem = cart.items[index];
      const { price } = item._doc;
      return {
        barcode: cartItem.barcode,
        name: cartItem.name,
        price,
        count: cartItem.count,
        subTotal: price * cartItem.count
      };
    });

    const total = calcTotal(orderItems);

    const newOrder = {
      orderNumber,
      ...cart,
      items: orderItems,
      total
    };
    await CustomerOrderModel.create(newOrder)
      .then(value => {
        console.log("Added order!", value);
      })
      .catch(error => console.error(error));
    // //Mark and descrease quantity cross order items from inventory
    // //TODO: Should probably use event emitters, and update user on what's happening.
    const ValidatedOrder = await PaymentService.ValidatePayment(newOrder);
    const StockPurchaseReport = await StockService.PurchaseStock(
      ValidatedOrder
    );
    const orderLogReport = await ReportingService.LogCustomerPurchase(
      StockPurchaseReport
    );

    // console.log({
    //   form: "Order Service",
    //   report: {
    //     ValidatedOrder,
    //     StockPurchaseReport,
    //     orderLogReport
    //   }
    // });

    console.log({
      StockPurchaseReport,
      orderLogReport
    });
    return {
      StockPurchaseReport,
      orderLogReport
    };
  },
  deliverOrder(orderNumber) {
    StockModel.update(
      { orderNumber },
      { isCheckedOut: true, deliverStatus: 1 },
      (err, raw) => console.log({ raw, err })
    );
  }
};
