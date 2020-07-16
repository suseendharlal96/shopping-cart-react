const Product = require("../models/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    console.log(products);
    if (products) {
      res.status(200).json({
        msg: "Products",
        products,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const prod = await Product.findById(productId);
    if (prod) {
      res.status(200).json({
        msg: "Products",
        product: prod,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.createProduct = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  // console.log(req.file);
  const prod = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.imageurl,
    description: req.body.description,
    creator: req.userId,
  });

  try {
    const product = await prod.save();
    if (product) {
      res.status(200).json({
        msg: "Products",
        createdProduct: product,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  try {
    const updateId = req.params.updateId;
    const updated = await Product.update(
      { _id: updateId },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          image: req.body.imageurl,
          description: req.body.description,
        },
      }
    );
    console.log(updated);
    if (updated) {
      res.status(200).json({
        msg: "Products",
        product: updated,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  const delId = req.params.delId;
  try {
    const deleted = await Product.deleteOne({ _id: delId });
    if (deleted) {
      res.status(200).json({
        msg: "Deleted",
        product: deleted,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
