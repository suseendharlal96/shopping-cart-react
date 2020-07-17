const paypal = require("paypal-rest-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    if (req.body.email.trim() === "") {
      return res.status(400).json({ email: "Should not be empty" });
    } else {
      const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
      if (!req.body.email.trim().match(regEx)) {
        return res.status(400).json({ email: "Enter a valid email" });
      }
    }
    if (req.body.password.trim() === "") {
      return res.status(400).json({ password: "Should not be empty" });
    } else if (req.body.password.trim().length < 6) {
      return res
        .status(400)
        .json({ password: "Should be atleast 6 characters" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(422).json({ error: "User exists already" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    if (hashedPassword) {
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      const result = await newUser.save();
      const token = jwt.sign(
        {
          id: result.id,
          email: req.body.email,
        },
        "verysecretkey",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ result: result, token: token });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    if (req.body.email.trim() === "") {
      return res.status(400).json({ email: "Should not be empty" });
    } else {
      const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
      if (!req.body.email.trim().match(regEx)) {
        return res.status(400).json({ email: "Enter a valid email" });
      }
    }
    if (req.body.password.trim() === "") {
      return res.status(400).json({ password: "Should not be empty" });
    }
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPassValid = await bcrypt.compare(password, user.password);
    console.log(isPassValid);
    if (!isPassValid) {
      return res.status(400).json({ error: "Wrong credentials" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "verysecretkey",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      result: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (user) {
    return res.status(200).json({
      msg: "Cart retrieved",
      cart: user.cart,
    });
  } else {
    return res.status(404).json({
      error: "User not found",
    });
  }
};

exports.postCart = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  console.log(req.body);
  const product = req.body;
  const user = await User.findById(req.userId);
  if (user) {
    if (user.cart && user.cart.length) {
      const prod = user.cart.find((prd) => prd._id === product._id);
      if (prod) {
        prod.qty += 1;
      } else {
        user.cart.push({ ...product, qty: 1 });
      }
    } else {
      user.cart.push({ ...product, qty: 1 });
    }
    console.log(user.cart);
    const result = await User.update(
      { _id: req.userId },
      {
        $set: {
          cart: user.cart,
        },
      }
    );
    if (result) {
      return res.status(200).json({
        result,
        msg: "Cart added",
      });
    }
  }
};

exports.removeCartItem = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  const prodId = req.body.productId;
  const user = await User.findById(req.userId);
  if (user) {
    if (user.cart && user.cart.length) {
      const cIndex = user.cart.findIndex((c) => c._id === prodId);
      if (cIndex !== -1) {
        user.cart.splice(cIndex, 1);
      }
      const result = await user.save();
      console.log("res", result);
      if (result) {
        return res.status(200).json({
          msg: "CartItem removed",
        });
      }
    }
  }
};

exports.pay = (req, res, next) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5000",
      cancel_url: "http://localhost:5000/cart",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "asd",
              price: "sdf",
              currency: "USD",
              quantity: "asd",
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "sdf",
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.send("test");
    }
  });
};
