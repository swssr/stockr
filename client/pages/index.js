import { Component, Ref } from "react";
import Head from "next/head";

import BarcodeReader from "react-barcode-reader";

import OrderList from "./components/orders";
import StockList from "./components/stock";
import AddStockForm from "./components/form";

import { card, sect } from "./styles/styles";

import { apiURI } from "../config/index";

function Index() {
  return (
    <div>
      <AddStockForm></AddStockForm>
      {/* <StockList></StockList> */}
    </div>
  );
}
export default Index;
