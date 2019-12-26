async function ValidatePayment(order) {
  /**
   * !!TODO: Strecth Goal: Generate a payment validation token, sort of checksum, sha256,
   * to prove your purchase claim, I should be able to decrypt it and get purchase datetime, your email, and cardnumber, and purchase amount and geolocation.
   * - It shouldn't contain any sensitive information
   * - It'll probably work better if this is part of the payment.service;
   */
  const msg = order.isPaid
    ? "Payment validated successfully!"
    : "Payment validation failed!";

  const paymentValidationToken = "SomeSHA256encrytedKey";
  return { ...order, msg, paymentValidationToken };
}

module.exports = {
  ValidatePayment
};
