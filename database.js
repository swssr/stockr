const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

//Connecting to database
const uri = MONGO_URI || "mongodb://localhost:27017/bzntechdb";
const options = {
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true 
};

mongoose.connect(uri, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // Successfully connected to database!
  console.log("Connected to database");
});
