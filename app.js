let products = require("./data");

const express = require("express");

const app = express();

app.get("/products", (req, res) => {
  res.json({ products });
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

app.listen(8000, () => {
  console.log("The application is listening on localhost:8000");
});
