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
      .then(data => setStock(data));
  }, []);
  return stock.map(item => (
    <figure>
      <h5>{item.barcode}</h5>
      <h3>{item.name}</h3>
      <h4>{item.price}</h4>
      {item.onSale && <h3>{item.salePrice}</h3>}
    </figure>
  ));
}

export default App;
