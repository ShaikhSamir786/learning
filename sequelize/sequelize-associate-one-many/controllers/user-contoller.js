const { User } = require("../Models/captain-models");
const { Ship } = require("../Models/ship-models");
const { sequelize } = require("../configs/sequelize-mysql");



// Insert a new user
const insertUser = async (req, res) => {
  try {
    const { user, ship } = req.body;

    if (!user || !user.name) {
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
    // Eager loading users with their ships
    const usersWithShips = await User.findAll({
      include: [
        {
          model: Ship,
          as: 'ships',
        },
      ],
    });

    
  //   // Lazy loading users with their ships
  //   const users = await User.findAll();


  //  const usersWithShips = await Promise.all(
  //     users.map(async (user) => {
  //       const ships = await user.getShips(); // Sequelize auto-generates this based on association
  //       return {
  //         ...user.toJSON(),
  //         ships, // attach ships manually
  //       };
  //     })
  //   );


    return res.status(200).json(usersWithShips);
  } catch (error) {
    console.error('Error in getAllUser:', error);
    return res.status(500).json({
      message: 'Error in getAllUser',
      error: error.message, // include the actual error message for debugging
    });
  }
};

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



const unmanagedTransaction = async (req, res) => {
  const transaction = await sequelize.transaction(); // start transaction

  try {
    const { user, ship } = req.body;

    // 🛑 Basic validation
    if (!user?.name || !user?.email) {
      return res.status(400).json({ message: "User 'name' and 'email' are required" });
    }

    if (!ship?.name) {
      return res.status(400).json({ message: "Ship 'name' is required" });
    }

    // 1️⃣ Create a new user
    const newUser = await User.create(
      {
        name: user.name,
        email: user.email,
      },
      { transaction }
    );

    // 2️⃣ Create a new ship linked to this user
    const newShip = await Ship.create(
      {
        name: ship.name,
        userId: newUser.id,
      },
      { transaction }
    );

    // 3️⃣ Commit transaction if everything succeeds
    await transaction.commit();
    console.log("✅ Transaction committed successfully");

    return res.status(201).json({
      message: "User and Ship created successfully",
      user: newUser,
      ship: newShip,
    });

  } catch (error) {
    // ❗ Rollback if anything fails
    await transaction.rollback();
    console.error("❌ Transaction failed:", error);

    return res.status(500).json({
      message: "Transaction failed",
      error: error.message,
    });
  }
};



const managedTransaction = async (req, res) => {
  try {
    const { user, ship } = req.body;

    // 🛑 Basic validation
    if (!user?.name || !user?.email) {
      return res.status(400).json({ message: "User 'name' and 'email' are required" });
    }

    if (!ship?.name) {
      return res.status(400).json({ message: "Ship 'name' is required" });
    }

    // ✅ Managed transaction
    const result = await sequelize.transaction(async (t) => {
      // 1️⃣ Create User
      const newUser = await User.create(
        {
          name: user.name,
          email: user.email,
        },
        { transaction: t }
      );

      // 2️⃣ Create Ship linked to User
      const newShip = await Ship.create(
        {
          name: ship.name,
          userId: newUser.id,
        },
        { transaction: t }
      );

      // Return both created objects
      return { newUser, newShip };
    });

    // Transaction automatically commits if no errors
    return res.status(201).json({
      message: "User and Ship created successfully (managed transaction)",
      user: result.newUser,
      ship: result.newShip,
    });

  } catch (error) {
    // Transaction automatically rolled back on error
    console.error("❌ Managed transaction failed:", error);
    return res.status(500).json({
      message: "Transaction failed",
      error: error.message,
    });
  }
};


module.exports = {
  insertUser,
  getalluser,
  updateuserdetails,
  deleteuser,
  unmanagedTransaction,
  managedTransaction
};


