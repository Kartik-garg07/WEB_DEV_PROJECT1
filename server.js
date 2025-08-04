const app = require("./src/app")
const connect = require("./src/db/db")

connect()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = connect;