const products = require("./data");

const express = require("express");

const app = express();

app.get("/products", (req, res) => {
  res.json({ products });
});

app.listen(8000, () => {
  console.log("The application is listening on localhost:8000");
});
