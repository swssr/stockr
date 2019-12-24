import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { apiURI } from "../../config/index";

// import { Icon, Label, Menu, Table } from "semantic-ui-react";

// export default ({ data }) => (
//   <Table celled>
//     <Table.Header>
//       <Table.Row>
//         <Table.HeaderCell>barcode</Table.HeaderCell>
//         <Table.HeaderCell>name</Table.HeaderCell>
//         <Table.HeaderCell>price</Table.HeaderCell>
//         <Table.HeaderCell>quantity</Table.HeaderCell>
//         <Table.HeaderCell>orders</Table.HeaderCell>
//       </Table.Row>
//     </Table.Header>

//     <Table.Body>
//       {data.map(row => (
//         <Table.Row key={row.name}>
//           <Table.Cell>{row.barcode}</Table.Cell>
//           <Table.Cell>{row.name}</Table.Cell>
//           <Table.Cell align="right">{row.price}</Table.Cell>
//           <Table.Cell align="right">{row.quantity}</Table.Cell>
//           <Table.Cell align="right">{row.orders}</Table.Cell>
//         </Table.Row>
//       ))}
//     </Table.Body>
//   </Table>
// );

export default function SimpleTable({ data }) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });
  const classes = useStyles();
  //Onload
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>barcode</TableCell>
            <TableCell>name</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right">orders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.barcode}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.orders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
