const { CustomerModel } = require("../models/user.model");

module.exports = {
  async GetCustomers() {
    let response = await CustomerModel.find();
    return response;
  },
  async GetCustomersWhere(criteria) {
    return await CustomerModel.find(criteria);
  }
};
