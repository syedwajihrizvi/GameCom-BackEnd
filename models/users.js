const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    nameOnCard: {
        type: String,
        required: true
    },
    selectedPlan: {
        type: String,
        required: true
    },
    favoriteGames: [{
        type: String,
        required: true
    }]
})

const registerSchema = {
    email: Joi.string().email().required().messages({"*": "Invalid Email"}),
    firstName: Joi.string().min(2).max(255),
    lastName: Joi.string().min(2).max(255),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({"*": "Invalid Password"}),
    cardNumber: Joi.string().length(16).pattern(/^[0-9]*$/).required().messages({"*": "Invalid Card Number"}),
    expirationDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).required().messages({"*": "Invali expiry date"}),
    cvv: Joi.string().pattern(new RegExp(/^\d{3}$/)).required().messages({"*": "Invalid CVV"}),
    nameOnCard: Joi.string(),
    selectedPlan: Joi.string()
}

// Generate an auth token for a user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, firstName: this.firstName}, config.get("jwtPrivateKey"))
    return token
}

function validateUser(user) {
    const schema = Joi.object(registerSchema)
    return schema.validate(user)
}

const User = mongoose.model("User", userSchema)

module.exports.User = User
module.exports.validateUser = validateUser