// const { User } = require('./Models/captain-models');
// const { Ship } = require('./Models/ship-models');

// // One-to-many
// User.hasMany(Ship, {
//   foreignKey: 'userId',
//   as: 'ships',          // alias used in queries
//   onDelete: 'CASCADE',  // optional: cascades delete
//   onUpdate: 'CASCADE'
// });

// Ship.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'owner'           // alias to reference the user from a ship
// });

// module.exports = {};
