const SequelizeSlugify = require("sequelize-slugify");
const { Product } = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",

    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      slug: {
        type: DataTypes.STRING,
        unique: true,
      },

      price: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
        validate: {
          min: { args: [0.5], msg: "Minimum price is 1." },
          max: { args: [20], msg: "Maximum price is 20." },
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });
  return Product;
};
