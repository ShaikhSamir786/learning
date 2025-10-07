const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/config-sequelize-postgres');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
    },
    {
        timestamps: true,
        tableName: 'users',
    }
);

console.log(User === sequelize.models.User); // true

module.exports = { User };
