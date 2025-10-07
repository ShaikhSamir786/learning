const { User } = require('./Models/captain-models');
const { Ship } = require('./Models/ship-models');

// One-to-One: A User owns one Ship
User.hasOne(Ship, {
  foreignKey: "userId", // FK in ships table
  as: "ship",
});

Ship.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

