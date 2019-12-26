import Axios from "axios";

// export default {
//   apiURI: "http://localhost:8080/v1/api"
// };

Axios.get("http://localhost:8080/v1/api/stock").then(res => {
  const orders = res.data;
  let count = 1;
  const _orderCustomers = [];
  let customer = {
    email: "",
    orderNumbers: []
  };
  for (let index = 0; index < orders.length; index++) {
    const order = orders[index];
    const nextOrder = orders[(index + 1) % orders.length];
    if (order.email === nextOrder.email) {
      customer.email = order.email;
      customer.orderNumbers.push(order.orderNumber);
    }
  }
});

//Can filter forEach 