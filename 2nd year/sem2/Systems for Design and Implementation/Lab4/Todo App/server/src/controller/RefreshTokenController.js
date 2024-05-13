const userModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const refreshToken = cookies.jwt;

    const foundUser = await userModel.getUserByRefreshToken(refreshToken);
    if(!foundUser) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            const accessToken = jwt.sign(
                { 
                    "username": foundUser.username
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: '15s' }
            );
            res.json({ accessToken });
        }
    )
}

module.exports = {
    handleRefreshToken
};