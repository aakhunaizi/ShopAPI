const { Product } = require("../db/models/");

exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      err = {
        status: 404,
        messsage: "No Products",
      };
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      err = {
        status: 404,
        messsage: "Product not found",
      };
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      err = {
        status: 404,
        messsage: "Product not found",
      };
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
