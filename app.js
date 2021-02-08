let products = require("./data");

const express = require("express");

const db = require("./db/models");

const { Product } = require("./db/models/");
const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product !== foundProduct);
    res.status(204).end();
  } else {
    res
      .status(404)
      .json({ message: `A product with id ${productId} does not exist.` });
  }
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

db.sequelize.sync();

app.listen(8000, () => {
  console.log("The application is listening on localhost:8000");
});
