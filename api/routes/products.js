const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const productController = require("../controllers/product");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });


// Get all products
router.get("/", productController.getAllProducts);

// Create a product
router.post("/", productController.createProduct);

// Get a single product
router.get("/:productId", productController.getSingleProduct);

// Update a product
router.patch("/:updateId", productController.updateProduct);

// Delete a product
router.delete("/:delId", productController.deleteProduct);

module.exports = router;
