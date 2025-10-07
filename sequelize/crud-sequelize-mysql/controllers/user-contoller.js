const { User } = require("../Models/user-models");
const { sequelize } = require("../configs/sequelize-mysql");

const insertUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const data = User.build({ firstName, lastName, email });
    await data.save();
    console.log("data", data);
    res
      .status(201)
      .json({ message: "User registered successfully", user: data });
  } catch (error) {
    console.error("Error inserting user:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

const getalluser = async (req, res) => {
  try {
    const users = await User
      .findAll
      // {attributes: ['id', 'firstName' ]}
      // {attributes: [['id', 'sr'] , ['firstName', 'fn']] }
      ();

    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

const aggregateExample = async (req, res) => {
  try {
    const result = await User.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("firstName")), "firstName"],
      ],
    });

    // Sequelize returns an array, we need plain JSON
    const count = result[0].get("firstName");

    res.status(200).json({
      message: "Total Firstname count fetched successfully",
      firstName: count,
    });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user count", error: error.message });
  }
};

const updateuserdetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = {
  insertUser,
  getalluser,
  aggregateExample,
  updateuserdetails,
  deleteuser,
};
