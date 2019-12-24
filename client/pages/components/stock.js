import React from "react";
import { apiURI } from "../../config";
import { sect, card } from "../styles/styles";

import SimpleTable from "./table";
import { removeDuplicates } from "../../../utils/helpers";

class StockList extends React.Component {
  constructor() {
    super();
    this.state = {
      stock: null
    };
  }

  componentDidMount() {
    //Onload
    fetch("http://localhost:8080/v1/api/stock")
      .then(res => res.json())
      .then(data => {
        this.setState({ stock: [...data] });
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <section>
        <h1>Available Stock</h1>
        {() => <SimpleTable data={this.state.stock}></SimpleTable>}
      </section>
    );
  }
}

export default StockList;
