const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",

    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      slug: {
        type: DataTypes.STRING,
        unique: true,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Shop, {
    source: ["name"],
  });
  return Shop;
};
