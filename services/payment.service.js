async function ValidatePayment(order) {
  return { ...order, isPaid: true };
}

module.exports = {
  ValidatePayment
};
