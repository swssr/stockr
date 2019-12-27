const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  customerId: String,
  items: [StockItem],
  lastUpdate: Date.now().toString()
});
