const express = require("express");
const { dbConnect} = require("./config-sequlize");
const sequelizeclient = require("./models");
const { User } = require("./models");

// ensure associations are set up

const app = express(); // initialize app first
const port = 8000;

// middlewares / routes
app.use(express.json());



dbConnect()
    .then(() => {
        User.sync({ alter: true })
            .then(() => console.log('models connected'))
            .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
    

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
