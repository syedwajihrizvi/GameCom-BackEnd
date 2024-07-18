const mongoose = require('mongoose')
const Joi = require('joi')

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
        required: true
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
    }
})

const registerSchema = {
    email: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string(),
    cardNumber: Joi.string(),
    expirationDate: Joi.string(),
    cvv: Joi.string(),
    nameOnCard: Joi.string()
}


function validateUser(user) {
    const schema = Joi.object(registerSchema)
    return schema.validate(user)
}

const User = mongoose.model("User", userSchema)

module.exports.User = User
module.exports.validateUser = validateUser