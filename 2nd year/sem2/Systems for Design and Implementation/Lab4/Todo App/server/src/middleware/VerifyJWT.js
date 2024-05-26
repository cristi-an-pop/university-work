const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' }); // Invalid Token
            }
            req.user = decoded.userid;
            req.roles = decoded.roles;
            next();
        }
    );
}   

module.exports = verifyJWT;