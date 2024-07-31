const { User } = require('../models/users')
const express = require('express')
const router = express.Router()

router.post('', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(401).send("Invalid email or password")
        }
    
        if (user.password != req.body.password) {
            return res.status(401).send("Invalid email or password")
        }
    
        const jsonwebtoken = user.generateAuthToken()
        return res.send(jsonwebtoken)        
    } catch (error) {
        return res.status(501).send("An internal server error occurred")
    }
})

module.exports = router