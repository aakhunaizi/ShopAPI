const express = require("express");

const db = require("./db/models");

const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use("/products", productRoutes);

db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is listening on localhost:8000");
});
