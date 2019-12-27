const mongoose = require("mongoose");
const { Router } = require("express");

const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");

const router = Router();
router.get("/", async (req, res) => {
  try {
    const customers = await UserService.GetCustomers();
    res.status(200).json(customers);
  } catch ({ message }) {
    res.send({ message });
  }
});

/**
 * Everyone is a customer until we manually add them to the admins list.
 */
router.post("/register", async (req, res) => {
  try {
    const response = await AuthService.RegisterUser(req.body);
    res.status(200).json(response);
  } catch ({ message }) {
    res.send({ message });
  }
});

module.exports = router;
