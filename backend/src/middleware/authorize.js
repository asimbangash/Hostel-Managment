// const ROLES = [{
//     ADMIN: 'admin',
//     USER: 'user',
// }]

// const userRoles = [{
//     '12345': ROLES['ADMIN'],
//     '54321': ROLES['USER']
// }]

function authorizeAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decode = jwt.decode(token, 'is4myar2x');
    req.user = decode;
    const role = req.user.role;
    if (role === 'admin') {
        next()
    } else {
        res.status(402).send({ message: 'Forbidden' })
    }
}

module.exports = { authorizeAdmin }