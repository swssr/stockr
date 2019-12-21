import { Component, Ref } from "react";
import BarcodeReader from "react-barcode-reader";

import OrderList from "./components/orders";
import StockList from "./components/stock";

import { card, sect } from "./styles/styles";

import { apiURI } from "../config/index";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      barcode: "",
      stock: [],
      currentItem: {
        barcode: "",
        name: "",
        price: 12345,
        count: 0,
        isNew: true
      },
      items: null
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    const isNew = this.state.stock.filter(item => item.barcode === data).length;
    !isNew &&
      this.setState({
        currentItem: {
          ...this.state.currentItem,
          barcode: data,
          count: this.state.currentItem.count + 1,
          isNew
        },
        items: [this.state.items, this.state.currentItem]
      });
  }
  handleError(err) {
    console.error(err);
  }

  componentDidMount() {
    console.log("moounting");
    fetch(apiURI + "/stock")
      .then(res => res.json())
      .then(data => {
        console.log({ data });
        this.setState({ stock: [...data] });
      });
  }
  handleSubmit = event => {
    event.preventDefault();
    const msg = this.state.currentItem.isNew
      ? "Add new item to stock"
      : "Increase quantity";
    confirm(msg) &&
      fetch(apiURI + "/stock", {
        method: "POST",
        body: JSON.stringify({ items: this.state.items })
      }).catch(console.log);
    //TODO: add to stock.
  };

  render() {
    const { items, stock, currentItem } = this.state;
    return (
      <div style={sect}>
        {/* <form onSubmit={this.handleSubmit}>
          <h1>Add Stock</h1>
          <BarcodeReader onError={this.handleError} onScan={this.handleScan} />
          barcode:{" "}
          <input
            type="text"
            value={this.state.currentItem.barcode}
            onChange={() =>
              this.setState({ currentItem: { barcode: currentItem.barcode } })
            }
          />{" "}
          <br />
          name:{" "}
          <input
            type="text"
            value={this.state.currentItem.barcode}
            onChange={() =>
              this.setState({ currentItem: { name: currentItem.name } })
            }
          />{" "}
          <br />
          count:{" "}
          <input
            type="text"
            value={this.state.currentItem.barcode}
            onChange={() =>
              this.setState({ currentItem: { count: currentItem.count } })
            }
          />{" "}
          <br />
          <button type="submit">SUBMIT</button>
        </form> */}
        {/* <p>items: {JSON.stringify(this.state.items)}</p> */}
        <StockList stock={stock}></StockList>
        <OrderList stock={stock}></OrderList>
      </div>
    );
  }
}
export default Index;
