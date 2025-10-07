const { table } = require('console');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/sequelize-mysql');


const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false, // Changed to not allow null
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Added unique constraint
        },
    },
    {
        // Other model options go here
        timestamps: true, // Added timestamps option
        tableName: 'users', // Specified custom table name
    },
);

console.log(User === sequelize.models.User); // true

module.exports = { User };