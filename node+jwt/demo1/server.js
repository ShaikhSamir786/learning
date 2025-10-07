const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000 ;
const router = require('./routes/authroutes')
const logger = require('./configs/logger');
const connectDB =require('./configs/mongoose')
const productrouter = require('./routes/product')
const eventroutes = require('./routes/eventroutes')
require('dotenv').config()




app.use(express.json());
connectDB()


app.use('/api/auth', router);
app.use('/product',  productrouter)
app.use('/event', eventroutes)


 app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });