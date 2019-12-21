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

    // const orderItems = itemsBought.map((item, index) => {
    //   const cartItem = cart.items[index];
    //   return {
    //     barcode: cartItem.barcode,
    //     price: cartItem.price,
    //     count: cartItem.count,
    //     subTotal: cartItem.price * cartItem.count
    //   };
    // });
    // const total = calcTotal(orderItems);
    // const newOrder = {
    //   orderNumber,
    //   customerDetails: cart.customerDetails,
    //   items: orderItems,
    //   total
    // };
    // let doc = { raw: null };
    // await OrderModel.create(newOrder).catch(error => console.error(error));
    // OrderModel.updateOne(
    //   { orderNumber },
    //   { $push: { items: { $each: cart.items } } }
    // )
    //   .then(raw => (doc.raw = raw))
    //   .catch(error => console.error(error));

    // //Mark and descrease quantity cross order items from inventory
    // //TODO: Should probably use event emitters, and update user on what's happening.
    // const paidOrder = await PaymentService.ValidatePayment(newOrder);
    // const report = StockService.PurchaseStock(paidOrder);
    // return { report, doc };
    return { itemsBought };
  }
};
