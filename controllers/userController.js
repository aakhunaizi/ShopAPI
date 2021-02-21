const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.firstName,
      exp: Date.now() + 900000, // in ms
    };
    const token = jwt.sign(JSON.stringify(payload), "averysecurekey");
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    exp: Date.now() + 900000, // in ms
  };
  const token = jwt.sign(JSON.stringify(payload), "averysecurekey");
  res.json({ token });
};
