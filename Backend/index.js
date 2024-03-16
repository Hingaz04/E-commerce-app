const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database connection with mongodb
mongoose.connect(
  "mongodb+srv://hingaz:1234@cluster0.jaieguh.mongodb.net/e-commerce"
);
// API creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image Storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "upload", "images"), // Absolute path to destination directory
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use("/images", express.static(path.join(__dirname, "uploads", "images")));

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating products
const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  try {
    const lastProduct = await Product.findOne({}, {}, { sort: { id: -1 } });
    let id = 1; // Default ID if no products exist
    if (lastProduct) {
      id = lastProduct.id + 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("Saved");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, error: "Error adding product" });
  }
});

//Creating API for deleting Products
app.post("/removeproduct", async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });
    if (!deletedProduct) {
      console.log("Product not found");
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    console.log("Product removed:", deletedProduct);
    res.json({
      success: true,
      name: deletedProduct.name,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, error: "Error removing product" });
  }
});

// Creating API for getting all the products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
});
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error : " + error);
  }
});
