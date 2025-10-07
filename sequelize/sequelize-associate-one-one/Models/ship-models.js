const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize-mysql");

const Ship = sequelize.define("Ship", {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  crewCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50,
  },
  amountOfSails: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: "ships",   // 👈 ensure this matches DB
  timestamps: true,
});


module.exports = { Ship };
