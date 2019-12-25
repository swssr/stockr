const OrderModel = require("../models/reports/order.report");
const { secret } = require("../config");
const orderid = require("order-id")(secret);

const { calcTotal } = require("../utils/helpers");

const StockModel = require("../models/stockItem.model");
const StockService = require("../services/stock.service");
const PaymentService = require("../services/payment.service");

module.exports = {
  async GetOrderWhere(criteria) {
    return await OrderModel.find(criteria);
  },
  async GetOrders() {
    let response = await OrderModel.find();
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
    await OrderModel.create(newOrder)
      .then(value => {
        console.log("Added order!", value);
      })
      .catch(error => console.error(error));
    // //Mark and descrease quantity cross order items from inventory
    // //TODO: Should probably use event emitters, and update user on what's happening.
    const CustomerOrderSlip = await PaymentService.ValidatePayment(newOrder);
    const StockPurchaseReport = StockService.PurchaseStock(CustomerOrderSlip);
    return {
      CustomerOrderSlip,
      StockPurchaseReport
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
