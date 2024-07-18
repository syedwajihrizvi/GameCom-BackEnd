const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
const users = require("./routes/users")

mongoose.connect("mongodb://localhost/gamecom")
        .then(res => console.log("Successfully connected to database"))
        .catch(err => console.log())

app.use(express.json())
app.use(cors())
app.use('/gamecom/api/users/', users);

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})