const { Router } = require("express");

const { OrderService } = require("../services");
const OrderModel = require("../models/reports/order.report");

const router = Router();
//Customer check out
router.post("/", async (req, res) => {
  let { cart } = req.body;
  try {
    const report = await OrderService.CreateOrder(cart);
    res.status(200).json({ report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    t;
    let orders = await OrderService.GetOrders();
    res.status(200).json(orders.reverse());
  } catch (error) {
    res.status(500).send(error);
  }
});
//TODO: Remove this.
router.delete("/", (req, res) => {});

module.exports = router;
