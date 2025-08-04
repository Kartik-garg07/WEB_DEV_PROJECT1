const express = require("express")
const productModel = require("../models/product.model")

const router = express.Router()

router.get("/", async (req, res) => {
   const products = await productModel.find();
   const search = req.query.search || "";
   res.render("index.ejs", { products, title: "home page", email: req.session.email, search });
});



module.exports = router
