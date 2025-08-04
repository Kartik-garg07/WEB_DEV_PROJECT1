
const mongoose = require("mongoose");

function connect() {
  return mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connect;