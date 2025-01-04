module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    category_name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    sequence: { type: DataTypes.INTEGER },
  });
  return Category;
};
