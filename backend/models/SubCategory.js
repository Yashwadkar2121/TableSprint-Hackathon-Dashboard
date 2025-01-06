module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define(
    "Subcategory",
    {
      subcategory_name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      sequence: { type: DataTypes.INTEGER },
    },
    {
      timestamps: false, // Disable createdAt and updatedAt
    }
  );
  return Subcategory;
};
