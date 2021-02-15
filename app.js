const express = require("express");

const db = require("./db/models");

const productRoutes = require("./routes/products");

const app = express();

const cors = require("cors");

const path = require("path");

//Middleware

app.use(express.json());
app.use(cors());
app.use("/products/", productRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

//Not Found Middleware

app.use((req, res, next) => {
  next({
    status: 404,
    message: "Sorry, we can't find what you're looking for.",
  });
});

//Error Handling Middleware

app.use((err, req, res, next) => {
  res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "Internal Server Error" });
});

db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is listening on localhost:8000");
});
