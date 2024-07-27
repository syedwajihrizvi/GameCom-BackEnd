const { User } = require('../models/users')
const express = require('express')
const router = express.Router()

router.post('', async (req, res) => {
    console.log("Login route called")
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(401).send("Invalid email or password")
    }

    if (user.password != req.body.password) {
        return res.status(401).send("Invalid email or password")
    }

    const jsonwebtoken = user.generateAuthToken()
    return res.send(jsonwebtoken)
})

module.exports = router