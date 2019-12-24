async function ValidatePayment(order) {
  const msg = order.isPaid
    ? "Payment validated successfully!"
    : "Payment validation failed!";

  return { ...order, msg };
}

module.exports = {
  ValidatePayment
};
