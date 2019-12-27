const { CustomerModel } = require("../models/user.model");
/**
 * Everyone is a customer until we manually add them to the admins list.
 */

module.exports = {
  async RegisterUser(newUser) {
    let response = "";
    const exists = !!(await CustomerModel.find({ email: newUser.email }))
      .length;
    if (exists) return { exists, msg: "User already exists" };
    try {
      //Hash password
      const passwordHash = hashPassword(newUser.password);
      const doc = {
        ...newUser,
        passwordHash
      };
      await CustomerModel.create(doc)
        .then(res => (response = res))
        .catch(err => (response = err));

      return {
        exists,
        response
      };
    } catch (error) {
      return error;
    }
  }
};

//!!TODO: Check to see which is better between hashing here or on front-end.
function hashPassword(password) {
  return `Some@Password!Hash50.393`;
}
