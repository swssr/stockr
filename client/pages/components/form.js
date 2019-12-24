import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import BarcodeReader from "react-barcode-reader";

export default function AddStockForm() {
  // const useStyles = makeStyles(theme => ({
  //   root: {
  //     "& > *": {
  //       margin: theme.spacing(1),
  //       width: 200
  //     }
  //   }
  // }));
  // const classes =  useStyles();
  // const [stock, setStock] = React.useState([]);
  // const [currentItem, setCurrentItem] = React.useState({ isNew: true });
  // const [recievingCart, recieveStockItem] = React.useState([]);

  // React.useEffect(() => {
  //   fetch("http://localhost:8080/v1/api/stock")
  //     .then(res => res.jsom())
  //     .then(data => setStock(data));
  // });
  // function handleScan(value) {
  //   const isIndexed =
  //     stock.findIndex(item => item.barcode === value.barcode) === -1
  //       ? false
  //       : true;
  //   setCurrentItem({ ...dbItem, isNew: isIndexed });
  //   console.log({ isIndexed });
  // }
  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setCurrentItem({
  //     ...currentItem,
  //     name: value
  //   });

  //   console.log({ currentItem });
  // }
  // function handleSubmit(event) {
  //   event.preventDefault();
  // }

  return <form></form>;
  // <form
  //   className={classes.root}
  //   noValidate
  //   autoComplete="off"
  //   onSubmit={handleSubmit}
  // >
  //   <BarcodeReader onError={handleError} onScan={handleScan} />
  //   <TextField
  //     name="barcode"
  //     label="barcode"
  //     variant="outlined"
  //     value={currentItem.barcode}
  //     onChange={handleInputChange}
  //   />
  //   <TextField
  //     name="Name"
  //     label="Name"
  //     variant="outlined"
  //     disabled={currentItem.isNew}
  //     onChange={handleInputChange}
  //   />
  //   <TextField
  //     name="Price"
  //     label="Price"
  //     variant="outlined"
  //     disabled={currentItem.isNew}
  //     onChange={handleInputChange}
  //   />
  //   <TextField
  //     name="Count"
  //     label="Count"
  //     variant="outlined"
  //     disabled={currentItem.isNew}
  //     onChange={handleInputChange}
  //   />
  // </form>
}
