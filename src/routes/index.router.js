const express = require("express")
const productModel = require("../models/product.model")

const router = express.Router()

router.get("/", async (req, res) => {
   const products = await productModel.find();
   const search = req.query.search || "";
   res.render("index.ejs", { products, title: "home page", email: req.session.email, search });
});

let cart = []; // Initialize an empty cart

router.post('/cart/add', (req, res) => {
  const { productId, productName } = req.body;
  cart.push({ id: productId, name: productName });
  res.json({ cartCount: cart.length });
});

router.post('/cart/remove', (req, res) => {
  const { productId } = req.body;
  cart = cart.filter(item => item.id !== productId);
  res.redirect('/cart');
});

router.get('/cart', (req, res) => {
  res.render('cart', { cart });
});// Search functionality




module.exports = router
