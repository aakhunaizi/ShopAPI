const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    req.body.shopId = req.shop.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  const shops = await Shop.findAll({
    attributes: ["id", "name"],
    include: {
      model: Product,
      as: "products",
      attributes: ["id", "name"],
    },
  });
  res.status(200).json(shops);
};

exports.shopDetail = async (req, res, next) => {
  res.json(req.shop);
};

exports.shopUpdate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  const updatedShop = await req.shop.update(req.body);
  res.status(200).json(updatedShop);
};

exports.shopDelete = async (req, res, next) => {
  await req.shop.destroy();
  res.status(204).end();
};
