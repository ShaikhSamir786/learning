const express = require('express');
const cors = require('cors');
const { User } = require('./models/user-model-postgre');
const { dbConnect } = require('./configs/config-sequelize-postgres');
const  userrouter = require('./routes/postgres-route')


const port = process.env.PORT || 3000;
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api' , userrouter);

//connect to db
dbConnect().then(() => {
  User.sync({ alter: true })  // `alter` is safer than `force`
    .then(() => console.log('User table is ready'))
    .catch(err => console.error('Error syncing User model:', err));
});

// routes
app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});


//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});