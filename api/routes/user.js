const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const checkAuth = require("../middleware/auth");

// signup
router.post("/signup", userController.signup);

// signin
router.post("/signin", userController.signin);

// add products to user cart
router.post("/cart", checkAuth, userController.cart);

module.exports = router;
