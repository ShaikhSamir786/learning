const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize-mysql");

const User = sequelize.define(
  "User",
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

module.exports = { User };
