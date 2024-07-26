const jwt = require('jsonwebtoken')


const genAccessToken = (user) => {
    return jwt.sign({ id: user._id, useremail: user.email, role: user.role }, 'accessSecret', { expiresIn: '15m' });
}

const genRefreshToken = (user) => {
    return jwt.sign({ id: user._id, useremail: user.email, role: user.role }, 'refreshSecret', { expiresIn: '7d' });
}

module.exports = { genAccessToken, genRefreshToken }