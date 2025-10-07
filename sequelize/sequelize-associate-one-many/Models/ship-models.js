const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize-mysql");

const Ship = sequelize.define(
  "Ship",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "ships",
    timestamps: true,
  }
);

module.exports = { Ship };
