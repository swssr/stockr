/**
 * ___TABLE OF CONTENT___
 * 1. Library imports
 * 2. Declarations
 * 3. Middlewares
 * 3. Route middleware, grouped.
 */

// #REGION imports
const express = require("express");
const cors = require("cors");

// #ENDREGION imports

// #REGION Declarations
const app = express();

const stockRouter = require("./routes/stock.router");
const ordersRouter = require("./routes/orders.route");
const usersRouter = require("./routes/user.route");

//2. Middleware
app.use(express.json());

app.use(cors());

//3. Middleware
app.use("/v1/api/stock", stockRouter);
app.use("/v1/api/orders", ordersRouter);
app.use("/v1/api/users", usersRouter);

module.exports = app;
