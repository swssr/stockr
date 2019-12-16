/**
 * ___TABLE OF CONTENT___
 * 1. Library imports
 * 2. Declarations
 * 3. Middlewares
 * 3. Route middleware, grouped.
 */

// #REGION imports
const express = require("express");

// #ENDREGION imports

// #REGION Declarations
const app = express();

const stockRouter = require("./routes/stock.router.js");

//2. Middleware
app.use(express.json());

//3. Middleware
app.use("/api", stockRouter);

module.exports = app;
