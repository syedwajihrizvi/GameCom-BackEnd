const express = require('express')
const { User, validateUser } = require('../models/users');
const authorization = require('../middleware/auth');
const router = express.Router();
const _ = require('underscore')

router.get('', (req, res) => {
    return res.send("Users")
})

router.get('/me', authorization, async (req, res) => {
    const userID = req.user._id
    const user = await User.findById(userID)
    if (!user) {
        return res.status(401).send("Invalid JWT Token")
    }
    return res.send({
        id: user._id, favoriteGames: user.favoriteGames, 
        email: user.email, password: user.password, plan: user.selectedPlan, 
        cardInfo: {cardNumber: user.cardNumber.substring(12), expiryDate: user.expirationDate},
        firstName: user.firstName[0]})
})

router.post('', async (req, res) => {
    const isValid = validateUser(req.body)
    if (!isValid) {
        return res.status(400).send("Invalid User")
    }
    // Does the user already exist
    const user = await User.findOne({email: req.body.email})
    if (user) {
        return res.status(400).send("User already exists")
    }
    const newUser = new User(req.body)
    try {
        const token = newUser.generateAuthToken()
        const result = await newUser.save()
        return res.header('x-auth-token', token).send(result)
    } 
    catch (err) {
        return res.status(400).send("Error" + err)
    }
})

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).send("Invalid User")
    }
    // Update the neccessary values
    for (let property in req.body) {
        // if the property is the favoriteGames, we need to add to the current games
        if (property.includes("favoriteGames")) {
            // Check if we are removing a gameID or adding a gameID
            if (property.includes("-")) {
                // Look for the index and delete if exists
                const propertyName = property.slice(1)
                const newGames = user[propertyName].filter(gameId => !req.body[property].includes(gameId))
                user[propertyName] = newGames
            } else {
                // Check if trying to add pre-existing game
                const commonElements = _.intersection(user[property], req.body[property])
                if (commonElements.length > 0)
                    return res.status(400).send("Attempted to add pre existing game")
                user[property] = [...user[property], ...req.body[property]]
            }
        } else {
            user[property] = req.body[property]
        }
    }
    // Validate the schema using Joi
    const {error} = validateUser(_.pick(user, ['email', 'firstName', 'lastName', 'password', 'cardNumber', 'expirationDate', 'cvv', 'nameOnCard', 'selectedPlan']))
    if (error) {
        console.log(error.details[0])
        return res.status(400).send(error.details)
    }
    try {
        const result = await user.save()
        return res.send(result)
    } catch (err) {
        return res.status(400).send(err)
    }
})

module.exports = router