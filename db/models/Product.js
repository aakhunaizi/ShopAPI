module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",

    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          min: { args: [1], msg: "Minimum price is 1." },
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
        validate: { isUrl: true },
      },
    }
  );
};
