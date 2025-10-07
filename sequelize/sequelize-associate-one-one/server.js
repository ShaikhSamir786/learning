const express = require("express");
const { dbConnect } = require("./configs/sequelize-mysql");
const userRouter = require("./routes/user-route");
const { sequelize } = require("./configs/sequelize-mysql");
require("./association"); // ensure associations are set up

const app = express(); // initialize app first
const port = 8000;

// middlewares / routes
app.use(express.json());
app.use("/api", userRouter);

// connect to DB then sync models
// dbConnect().then(() => {
//   User.sync({ force: true }) // `alter` is safer than `force`
//     .then(() => console.log("User table is ready"))
//     .catch((err) => console.error("Error syncing User model:", err));

//   Ship.sync({ force: true }) // `alter` is safer than `force`
//     .then(() => console.log("Ship table is ready"))
//     .catch((err) => console.error("Error syncing Ship model:", err));
// });


dbConnect().then(async () => {
  try {
    await sequelize.sync({ force: true });  // use alter in dev, force only for reset
    console.log("✅ All models (User + Ship + associations) synced successfully");
  } catch (err) {
    console.error("❌ Error syncing models:", err);
  }
});


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
