const userModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log("Cookie: ",req.cookies)
    if(!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const refreshToken = cookies.jwt;

    const foundUser = await userModel.getUserByRefreshToken(refreshToken);
    console.log("Found user: ", foundUser)
    if(!foundUser) {
        console.log("User not found");
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
                    "userid": foundUser.id,
                    "username": foundUser.username,
                    "roles": [foundUser.role]
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: '10s' }
            );
            console.log("Access token refreshed:", accessToken);
            res.json({ accessToken });
        }
    )
}

module.exports = {
    handleRefreshToken
};