const mongoose = require('mongoose');
const logger = require('./logger');


const connectDB = async function () {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/fileUploadDB');
        logger.info('MongoDB connected');
        
    } catch (err) {
        logger.error('MongoDB connection error:', err);
    }
}

module.exports = connectDB;