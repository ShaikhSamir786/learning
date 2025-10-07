const express = require('express');
const { dbConnect } = require('./configs/sequelize-mysql');
const { User } = require('./Models/user-models');
const userRouter = require('./routes/user-route');
const {body, json} = require('body-parser');

const app = express();  // initialize app first
const port = 5000;

// middlewares / routes
app.use(express.json());  
app.use('/api', userRouter);

// connect to DB then sync models
dbConnect().then(() => {
  User.sync({ alter: true })  // `alter` is safer than `force`
    .then(() => console.log('User table is ready'))
    .catch(err => console.error('Error syncing User model:', err));
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
