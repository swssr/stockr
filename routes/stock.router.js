const { Router } = require("express");
const mongoose = require("mongoose");

const router = Router();

const Stock = require("../models/stockItem.model");

/**
 * TABLE OF CONTENTS
 * __ADMIN SECTION__
 * 1. Listing all available stock
 * 2. Adding new stock to inventory
 * 3. setting up promo sales
 */

router.get("/", async (req, res) => {
  try {
    const items = await Stock.find();
    res.send(items);
    console.log({ items });
  } catch ({ message }) {
    res.send({ message });
  }
});

//Adding new stock to inventory
router.post("/", async (req, res) => {
  const { body } = req;
  /**
   * From the frontend find item of entered barcode
   *  then find and populate payload with the response object,
   *  else
   * curl -d '{barcode: 1234567890,name: "TestProduct",price: 12345}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/data
   */
  try {
    /**
     * Stocking report structure to be sent to admin,
     *  system should also save report with admin id.
     */
    const report = [];
    body.items.forEach(item => {
      const newItem = {
        //Increment `quantity` and `orders` prop on upsert.
        /**
         * frontEnd Increment count on scan.
         * 9781432102388
         * 9781432102388
         * 88H-0000UB-0TF
         *
         */
        ...item,
        $inc: { quantity: item.count || 0 }
      };
      //Add/Update where barcode equals newItem
      const criteria = { barcode: newItem.barcode };
      /** Used `upsert` instead of normal create, to simplify logic;
       *   searching for item => update quantity if barcode exist else create new
       * */
      Stock.update(criteria, newItem, { upsert: true }).then(() =>
        console.log("It worked")
      );
      //Generate report
      report.push(newItem);
    });
    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json("something broke");
  }
});

//Setting sale items
router.post("/setPromo", async (req, res) => {
  /**
   * Foreach =>
   * I need to provide -
   * barcode
   * salePrice
   *
   *
   */
  const { saleItems, promoPrice } = req.body;
  // saleItems.forEach(item => {
  //   await Stock.update({_id: item._id}, { onSale: true, promoPrice })
  // })
  res.json({ saleItems, promoPrice });
});

//Customer check out
router.post("/checkout", async (req, res) => {
  /**
   * Customer purchase route -
   * if items is on promotinal sale => soldFor = promoPrice
   *
   * TODO:
   * 1. Will need to generate and send a reciept to the customer
   *  and the admin with all purchase details.
   * 2. Admin will have to mark order as seen
   */
  const orders = body.orders;
  const customerEmail = body.user.email;
  const orderDetails = {
    customerEmail
  };

  try {
  } catch (error) {}
});

module.exports = router;
