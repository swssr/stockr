const Product = {
  barcode: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Int,
    required: true,
    default: 0
  },
  onSale: false,
  //Should be null by default
  salePrice: {
    type: Int,
    required: false,
    default: null
  },
  //TODO: Should be an array of strings
  image: {
    type: String,
    required: true
  }
};
