const app = require("./src/app")
const connect = require("./src/db/db")

connect()
  .then(() => {
    app.listen(3000, () => {
      console.log("server running on port no : ", 3000)
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err)
  })

module.exports = connect;