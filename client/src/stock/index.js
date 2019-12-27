import React from "react";
import AddStock from "./Add";
import EditStock from "./Edit";
import Cart from "./cart";
export default function index() {
  return (
    <div>
      <h1>Stock Inventory</h1>
      <Cart />
      {/* <AddStock></AddStock> */}
      {/* <EditStock></EditStock> */}
    </div>
  );
}
