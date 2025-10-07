const { Sequelize, Model } = require("sequelize");


  const sequelize = new Sequelize("demodb", "root", "1432", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false, // Disable logging; default: console.log
  });

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { dbConnect , sequelize };
