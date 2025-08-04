
const mongoose = require("mongoose");

function connect() {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(() => {
      console.log("MongoDB connected")
  }).catch((err) => {
      console.error("MongoDB connection error:", err)
  })
}
module.exports = connect;

