import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import config from "./config";
const { apiURI } = config;
function App() {
  return (
    <div className="App">
      <h1>Hello, again [Username]!</h1>
      <StockList></StockList>
    </div>
  );
}

function StockList(props) {
  const [stock, setStock] = useState([]);
  useEffect(() => {
    fetch(apiURI + "/stock")
      .then(res => res.json())
      .then(data => {
        setStock(data);
      });
  }, []);
  return (
    <section>
      <h1>All Stock</h1>
      {stock.map(item => (
        <figure>
          <h5>{item.barcode}</h5>
          <h3>{item.name}</h3>
          <h4>{item.price}</h4>
          {item.onSale && <h3>{item.salePrice}</h3>}
        </figure>
      ))}
    </section>
  );
}

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const { orderedCustomers, setOrderedCustomers } = useState([]);
  useEffect(() => {
    fetch(apiURI + "/stock")
      .then(res => res.json())
      .then(orders => {
        setOrders(prders);

        const _orderCustomers = orders.map((_currentOrder, index, arr) => {
          const {
            orderNumber,
            customerDetails,
            shippingDetails
          } = _currentOrder;

          const { currentEmail: email } = customerDetails;
          const { nextEmail: email } = arr[(index + 1) % arr.length];

          const previousOrders = [];

          if (currentEmail == nextEmail)
            const _customer = {
              ...customerDetails,
              shippingDetails,
              previousOrders
            };
        });
      });
    setOrderedCustomers();
  }, []);

  return (
    <section>
      <h1>All Orders</h1>
      {orders.map(item => (
        <figure>
          <h5>{item.barcode}</h5>
          <h3>{item.name}</h3>
          <h4>{item.price}</h4>
          {item.onSale && <h3>{item.salePrice}</h3>}
        </figure>
      ))}
    </section>
  );
}

export default App;
