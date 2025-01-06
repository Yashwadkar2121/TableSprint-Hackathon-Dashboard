module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_name: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      image: { type: DataTypes.STRING },
    },
    {
      timestamps: false, // Disable createdAt and updatedAt
    }
  );
  return Product;
};
