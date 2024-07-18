const express = require('express')
const { User, validateUser } = require('../models/users')
const router = express.Router();

router.get('', (req, res) => {
    return res.send("Users")
})

router.get(':id', (req, res) => {
    return res.send("User ID: " + req.params.id)
})

router.post('', async (req, res) => {
    console.log("Request Received")
    console.log(req.body)
    const isValid = validateUser(req.body)
    if (!isValid) {
        return res.status(400).send("Invalid User")
    }
    // Does the user already exist
    const user = await User.findOne({email: req.body.email})
    if (user) {
        console.log("User with given information already exists")
        return res.status(400).send("User already exists")
    }
    const newUser = new User(req.body)
    const result = await newUser.save()
    return res.send(result)
})

module.exports = router