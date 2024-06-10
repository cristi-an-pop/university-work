const userModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.createUser({ username, password: hashedPassword, email });
        console.log(user);
        res.status(201).json(user);
        console.log("User created");
    } catch (error) {
        if (error.code === '23505') {
            res.status(409).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.getUserByUsername(username);
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Unable to login' });
        }
        console.log(user.role)
        const accessToken = jwt.sign(
            {
                "userid": user.id,
                "username": user.username,
                "roles": [user.role]
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '10s' }
        );

        const refreshToken = jwt.sign(
            {
                "userid": user.id,
                "username": user.username,
                "roles": [user.role]
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '1d' }
        );
        console.log(accessToken);  // Log the token
        console.log(jwt.decode(accessToken))
        console.log("User logged in");
        await userModel.updateUserRefreshToken(user.username, refreshToken);
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ "userid": user.id, username, accessToken, "roles": [user.role] });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
        console.log("All users fetched");
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

const promoteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.promoteUser(id);
        res.status(200).json(user);
        console.log("User promoted");
    } catch (error) {
        res.status(500).json({ message: 'Error promoting user' });
    }
}

const demoteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.demoteUser(id);
        res.status(200).json(user);
        console.log("User demoted");
    } catch (error) {
        res.status(500).json({ message: 'Error demoting user' });
    }
}

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    promoteUser,
    demoteUser
};