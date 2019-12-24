import React from "react";
import { apiURI } from "../../config";
import { card, sect } from "../styles/styles";

class OrderList extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: null,
      stock: null
    };
  }

  componentDidMount() {
    fetch(apiURI + "/orders")
      .then(res => res.json())
      .then(data => {
        this.setState({ orders: data });
      })
      .catch(console.log);

    this.setState({ stock: this.props.stock });
  }
  render() {
    const { orders } = this.state;
    return (
      <section>
        <h1>All Orders</h1>
        {orders &&
          orders.map(order => {
            const { customerDetails, items, isPaid } = order;
            const count = items.length;
            return (
              <div className="card">
                <h3>
                  {customerDetails &&
                    customerDetails.fullname &&
                    customerDetails.fullname}
                </h3>
                <p>{order.orderNumber}</p>
                <ul>
                  {items.map(v => {
                    const name = v.name ? v.name : "Unkown";
                    return (
                      <li>
                        {name} * {count}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </section>
    );
  }
}

export default OrderList;
