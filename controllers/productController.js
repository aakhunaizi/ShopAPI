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
  const products = await Product.findAll();
  res.status(200).json(products);
};

exports.productDetail = async (req, res, next) => {
  res.json(req.product);
};

exports.productUpdate = async (req, res, next) => {
  try {
    const foundShop = await Shop.findByPk(req.product.shopId);

    if (req.user.id === foundShop.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.product.update(req.body);
      res.status(200).json(req.product);
    } else {
      res
        .status(401)
        .json({ message: "You cannot update another shop's products" });
    }
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    const foundShop = await Shop.findByPk(req.product.shopId);

    if (req.user.id === foundShop.userId) {
      await req.product.destroy();
      res.status(204).end();
    } else {
      res
        .status(401)
        .json({ message: "You cannot delete another shop's products" });
    }
  } catch (error) {
    next(error);
  }
};
