const express = require("express");

const app = express();
const stockRouter = require("./routes/stock.router.js")
app.use("/api", stockRouter);

module.exports = app;
