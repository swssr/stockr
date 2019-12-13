const User = {
  emailAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  shippingAddress: {
    type: String,
    required: false
  },
  purchaceHistory: [],
  //Roles
  isAdmin: false
};
