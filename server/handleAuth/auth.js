const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleAuth = {
    register: async (req, res) => {
        try {
            const { username, password, gender } = req.body;
            let newUserName = username.toLowerCase().replace(/ /g, '');

            const user_name = await Users.findOne({ username: newUserName });
            if (user_name) return res.status(400).json({ msg: 'User name already exists.' });

            if (password.length < 6)
                return res.status(400).json({ msg: 'Password must be at least 6 characters.' });
            // ma hoa pass
            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                username: newUserName,

                password: passwordHash,
                gender,
            });

            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
            });

            await newUser.save();

            res.json({
                msg: 'Register Successfully!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: '',
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await Users.findOne({ username });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect.' });

            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
            });
            res.json({
                msg: 'Login Successfully!',
                access_token,
                user: {
                    ...user._doc,
                    password: '',
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
            return res.json({ msg: 'Logged out!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = await req.cookies.refreshtoken;
            console.log(rf_token);
            if (!rf_token) return res.status(400).json({ msg: 'Please login now.' });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: 'Please login now.' });

                const user = await Users.findById(result.id).select('-password');

                if (!user) return res.status(400).json({ msg: 'This does not exist.' });

                const access_token = createAccessToken({ id: result.id });

                res.json({
                    access_token,
                });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = handleAuth;
