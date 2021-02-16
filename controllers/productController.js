const { Product, Shop } = require("../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  const products = await Product.findAll({
    attributes: req.body,
    include: {
      model: Shop,
      as: "shop",
      attributes: ["name"],
    },
  });
  res.status(200).json(products);
};

exports.productDetail = async (req, res, next) => {
  res.json(req.product);
};

exports.productUpdate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  const updatedProduct = await req.product.update(req.body);
  res.status(200).json(updatedProduct);
};

exports.productDelete = async (req, res, next) => {
  await req.product.destroy();
  res.status(204).end();
};
