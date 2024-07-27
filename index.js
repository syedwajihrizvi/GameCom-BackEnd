const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
const users = require("./routes/users")
const login = require("./routes/login")
const data = require("./routes/data")
const config = require('config')
const helmet = require('helmet')
const compression = require('compression')

if (!config.get("jwtPrivateKey") || !config.get("awsKey")) {
    console.log("Mandatory keys were not defined")
    process.exit(1)
}
mongoose.connect(config.get('db'))
        .then(res => console.log("Successfully connected to database"))
        .catch(err => console.log())

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(compression())
app.use('/gamecom/api/users/', users);
app.use('/gamecom/login/', login)
app.use('/gamecom/data', data)

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})