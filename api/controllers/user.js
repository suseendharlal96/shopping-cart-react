const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
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
          id: result.doc._id,
          email: req.body.email,
        },
        "verysecretkey",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ result, token });
    }
  } catch (err) {
    throw new Error("something went wrong");
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPassValid = bcrypt.compare(req.body.password, user.password);
    if (!isPassValid) {
      return res.status(422).json({ error: "Wrong credentials" });
    }
    const token = jwt.sign(
      {
        id: user.doc._id,
        email: user.email,
      },
      "verysecretkey",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      result: user,
      token,
    });
  } catch (error) {
    throw new Error("something went wrong");
  }
};
