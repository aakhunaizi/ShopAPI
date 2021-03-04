const express = require("express");

const db = require("./db/models");

const productRoutes = require("./routes/products");

const shopRoutes = require("./routes/shops");

const userRoutes = require("./routes/users");

const orderRoutes = require("./routes/orders");

const app = express();

const cors = require("cors");

const path = require("path");

const passport = require("passport");

const { localStrategy, jwtStrategy } = require("./middleware/passport");

//Middleware

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(userRoutes);
app.use(orderRoutes);
app.use("/products/", productRoutes);
app.use("/shops", shopRoutes);
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
