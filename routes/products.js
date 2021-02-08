const express = require("express");
const router = express.Router();
const { Product } = require("../db/models/");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "No Products" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
