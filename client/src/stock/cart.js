import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Cart({ stock }) {
  const [cartItems, setCartItems] = useState();
  const [recentScan, setRecentScan] = useState({
    barcode: "",
    name: "",
    price: 0,
    count: 0
  });

  const onScan = value => {
    setRecentScan({
      barcode: value
    });

    console.log(recentScan);
  };
  return <div></div>;
}
