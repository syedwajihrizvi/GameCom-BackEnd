const jwt = require('jsonwebtoken')

function authorization(req, res, next) {
    // Request will include the JWT token in the header
    const jwtToken = req.header('x-auth-token')
    if (!jwtToken) {
        return res.status(401).send("JWT Token was not detected in header")
    }
    try {
        const valid = jwt.verify(jwtToken, "jwtPrivateKey")
        req.user = valid
        next()
    } catch (error) {
        return res.status(401).send("Invalid token received")
    }
}

module.exports = authorization