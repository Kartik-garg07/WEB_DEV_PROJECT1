const express = require("express")
const productRouter = require("./routes/product.router")
const indexRouter = require("./routes/index.router")
const userRouter = require("./routes/user.router")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
require("dotenv").config()

const app = express()

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.error("MongoDB connection error:", err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "../public")))

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true
}));

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const { name, email } = req.body;
    req.session.name = name;
    req.session.email = email;
    res.redirect("/");
});

app.get("/cart", (req, res) => {
    res.redirect("/products/cart");
});

app.use((req, res, next) => {
    if (!req.session.email && req.path !== "/login") {
        return res.redirect("/login");
    }
    next();
});

app.use("/products", productRouter)
app.use("/", indexRouter)
app.use("/users", userRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something went wrong!")
})

module.exports = app
