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
    const foundShop = await Shop.findOne({
      where: { userId: req.user.id },
    });
    if (foundShop) {
      res.status(400).json({ message: "You already have a shop" });
    } else {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.userId = req.user.id;
      const newShop = await Shop.create(req.body);
      res.status(201).json(newShop);
    }
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      req.body.shopId = req.shop.id;
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      res
        .status(401)
        .json({ message: "You cannot add a product to another user's shop" });
    }
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  const shops = await Shop.findAll({
    include: {
      model: Product,
      as: "products",
      attributes: ["id"],
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

// exports.shopUpdate = async (req, res, next) => {
//   try {
//     if (req.user.id === req.shop.userId) {
//       req.body.shopId = req.shop.id;
//       if (req.file) {
//         req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//       }
//       const updatedShop = await req.shop.update(req.body);
//       console.log(updatedShop);
//       res.status(200).json(updatedShop);
//     } else {
//       res
//         .status(401)
//         .json({ message: "You cannot update another user's shop" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

exports.shopDelete = async (req, res, next) => {
  await req.shop.destroy();
  res.status(204).end();
};
