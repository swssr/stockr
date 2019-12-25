const mongoose = require("mongoose");
const 
const CartSchema = new mongoose.Schema({
  customerId: String,
  items: [StockItem]
})