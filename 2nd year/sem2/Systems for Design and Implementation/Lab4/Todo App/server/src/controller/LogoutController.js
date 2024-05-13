const userModel = require('../model/UserModel');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!req.cookies?.jwt) {
        return res.status(204); // No Content
    }

    const refreshToken = cookies.jwt;
    const foundUser = await userModel.getUserByRefreshToken(refreshToken);
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true});
        return res.status(204); // No Content
    }

    await userModel.updateUserRefreshToken(user.username, '');

    res.clearCookie('jwt', { httpOnly: true});
    res.status(204); // No Content
}

module.exports = {
    handleLogout
};