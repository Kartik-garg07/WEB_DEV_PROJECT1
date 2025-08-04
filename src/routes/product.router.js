const express = require("express");
const productModel = require("../models/product.model");
const ImageKit = require("imagekit");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", (req, res) => {
  res.render("productForm");
});

router.get("/add", (req, res) => {
  res.render("productForm");
});

router.get("/update/:id", async(req, res)=>{

    const productId = req.params.id

    const product = await productModel.findById(productId)


    res.render("updateForm",{product : product})
})

router.get("/delete/:id" , async (req,res)=>{
    const productId = req.params.id

    await productModel.findByIdAndDelete(productId)

    res.redirect("/")
})

router.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.render("cart", { cart });
});

router.get("/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    const addedToCart = req.query.addedToCart === "true";
    res.render("productDetail", { product, addedToCart, email: req.session.email });
});

router.post("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, category, price } = req.body;

        let imageUrl;
        if (req.file) {
            const imagekit = new ImageKit({
                publicKey: "public_M0PAK4NmC1d2995cVHB6hjiBgaE=",
                privateKey: "private_KT7FkfaTOTLNy6lVG+V7iKE2ba4=",
                urlEndpoint: "https://ik.imagekit.io/ls436o8px",
            });

            const result = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                isPrivateFile: false,
                isPublished: true
            });

            imageUrl = result.url;
        }

        const updateData = {
            title,
            description,
            category,
            price
        };

        if (imageUrl) {
            updateData.image = imageUrl;
        }

        await productModel.findByIdAndUpdate(productId, updateData);

        res.redirect(`/products/${productId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

router.post("/add", upload.single("image"), async (req, res) => {


  const imagekit = new ImageKit({
    publicKey: "public_M0PAK4NmC1d2995cVHB6hjiBgaE=",
    privateKey : "private_KT7FkfaTOTLNy6lVG+V7iKE2ba4=",
    urlEndpoint: "https://ik.imagekit.io/ls436o8px",
  });


  const result = await imagekit.upload({
    file : req.file.buffer,
    fileName : req.file.originalname,
    isPrivateFile : false,
    isPublished : true
  })

  const imageUrl = result.url


  
  
  const { title, description, category, price } = req.body;
  

      const product = new productModel(
          {
              title : title,
              description : description,
              category : category,
              price : price,
              image : imageUrl
           }
  )

      await product.save()

  res.redirect("/");
});

router.get("/buy/:id", async (req, res) => {

    res.send("Buy Now functionality coming soon!");
});

router.get("/add-to-cart/:id", async (req, res) => {
    const productId = req.params.id;
    if (!req.session.cart) req.session.cart = [];
    if (!req.session.cart.includes(productId)) {
        req.session.cart.push(productId);
    }

    res.redirect(`/products/${productId}?addedToCart=true`);
});

module.exports = router;


