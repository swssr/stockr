function PurgeCollection(Model) {
  Model.remove({}, () => console.log("all records removed"));
}

module.exports = {
  OrderService: require("./order.service"),
  ReportService: require("./report.service"),
  StockService: require("./stock.service"),
  PurgeCollection
};
