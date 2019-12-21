import React from "react";
import { apiURI } from "../../config";
import { sect, card } from "../styles/styles";

class StockList extends React.Component {
  constructor() {
    super();
    this.state = {
      stock: null
    };
  }

  componentDidMount() {
    fetch(apiURI + "/stock")
      .then(res => res.json())
      .then(data => this.setState({ stock: [...data] }));
  }
  render() {
    const { stock } = this.state;
    return (
      <section>
        <h1>Available Stock</h1>
        {stock &&
          stock.map(item => {
            return (
              <div style={card}>
                <p>{item.name}</p>
                <h3>{item.name}</h3>
                <p>quantity: {item.quantity}</p>
                <h4>{item.price}</h4>
              </div>
            );
          })}
      </section>
    );
  }
}

export default StockList;
