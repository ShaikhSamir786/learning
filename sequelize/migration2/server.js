const express = require("express");
// server.js
const db = require('./models/index');


 

const app = express(); 

const dbConnect = async () => {
  try {
    await db.sequelize.sync();
    console.log("✅ All models synchronized.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

dbConnect();  // Now works properly

// initialize app first
const port = 8000;

// middlewares / routes
app.use(express.json());



dbConnect();
    

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
