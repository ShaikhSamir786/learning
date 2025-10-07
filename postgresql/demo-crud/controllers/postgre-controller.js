const { User } = require("../models/user-model-postgre");
const { sequelize } = require("../configs/config-sequelize-postgres");

const insertUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create user
    const user = await User.create({ firstName, lastName, email });

   

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

module.exports = {
  insertUser,
};
