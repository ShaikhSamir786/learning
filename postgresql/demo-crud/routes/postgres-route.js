const express = require("express");
const router = express.Router();


const {
    insertUser
} =  require('../controllers/postgre-controller')


router.post('/create', insertUser)

module.exports = router 