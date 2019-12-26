const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const phoneRegex = /\d/;

module.exports = {
  //;
  emailValidator: {
    validator: value => emailRegex.test(value),
    message: "Email is invalid - fromDb"
  },
  passwordValidator: {
    validator: value => passwordRegex.test(value),
    message: "Password not strong enough - fromDb"
  },
  phoneValidator: {
    //TODO: validate phone number properly, remove spaces from frontend and before
    validator: value => value.length > 8,
    message: "Phone number is invalid - fromDb"
  },
  orderValidator: {
    validator: value => this.quantity >= value,
    message: "Number of order cannot be greater that the quantity"
  }
};
