const mongoose = require("mongoose");
const { Router } = require("express");

const { StockService, PurgeCollection } = require("../services");
const StockModel = require("../models/stockItem.model");

const router = Router();

/**
 * TABLE OF CONTENTS
 * __ADMIN SECTION__
 * 1. Listing all available stock
 * 2. Adding new stock to inventory
 * 3. setting up promo sales
 */

router.get("/", async (req, res) => {
  try {
    const items = await StockService.GetStock();
    res.status(200).json(items);
  } catch ({ message }) {
    res.send({ message });
  }
});

//Adding new stock to inventory
router.post("/", async (req, res) => {
  const { items } = req.body;
  const report = await StockService.AddStock(items);
  res.status(200).json({ report });
});

//Setting sale items
router.post("/setPromo", async (req, res) => {
  /**
   * Foreach =>
   * I need to provide -
   * barcode
   * promoPrice
   *
   *
   */
  try {
    const stockToUpdate = req.body;
    await StockService.SetPromo(stockToUpdate);
    return res.status(200).send("Promotion set successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post("/endPromo", async (req, res) => {
  /**
   * Foreach =>
   * I need to provide -
   * barcode
   *
   *
   *
   */
  try {
    await StockService.RemovePromo(req.body);
    return res.status(200).send("Promotion removed successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post("/setfeatured", async (req, res) => {
  /**
   * Foreach =>
   * I need to provide -
   * barcode
   *
   *
   *
   */
  try {
    await StockService.SetFeatured(req.body);
    return res.status(200).send("Items featured successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post("/removefeatured", async (req, res) => {
  /**
   * Foreach =>
   * I need to provide -
   * barcode
   *
   *
   *
   */
  try {
    await StockService.RemoveFeatured(req.body);
    return res.status(200).send("Removed items from Featured successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//TODO: REMOVE!!!! DO NOT SHIP THIS
// router.delete("/purge", (req, res) => PurgeCollection(StockModel));

module.exports = router;
