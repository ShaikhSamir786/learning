const express = require('express')
const router = require('./routes/route-multer')
const connectDB = require('./configs/configs-mongoose')


const app = express()
const port = 3000

connectDB()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.use('/api', router)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
