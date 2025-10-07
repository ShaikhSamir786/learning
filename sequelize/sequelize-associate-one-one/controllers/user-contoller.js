const { User } = require("../Models/captain-models");
const { Ship } = require("../Models/ship-models");
const { sequelize } = require("../configs/sequelize-mysql");


// Insert a new user
const insertUser = async (req, res) => {
  try {
    const { user, ship } = req.body;

    if (!user || !user.Name) {
      return res.status(400).json({ message: "User 'Name' is required" });
    }

    if (!ship || !ship.name) {
      return res.status(400).json({ message: "Ship 'name' is required" });
    }

    // Step 1: Create User
    const newUser = await User.create(user);

    // Step 2: Create Ship linked to User
    const newShip = await Ship.create({
      ...ship,
      userId: newUser.id, // foreign key
    });

    res.status(201).json({
      message: "User and Ship created successfully",
      user: newUser,
      ship: newShip,
    });
  }catch (error) {
  console.error("Error inserting user and ship:", error); // full error in console
  res.status(500).json({
    message: "Failed to insert user and ship",
    error: error.message,       // short error
    details: error.errors || [] // full Sequelize validation details
  });
}
}



// Get all users
const getalluser = async (req, res) => {
 
  try {
    
  } catch (error) {
    
  }
  

}



const updateuserdetails = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}



const deleteuser = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}


module.exports = {
  insertUser,
  getalluser,
  
  updateuserdetails,
  deleteuser,
};
