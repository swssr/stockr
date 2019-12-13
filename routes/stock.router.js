const { Router } = require("express");

const router = Router();

const Products = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    const Products = await Products.find();
    res.send(Products || []);
  } catch ({ message }) {
    res.send({ message });
  }
});

module.exports = router;
