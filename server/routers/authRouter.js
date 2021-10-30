const router = require('express').Router();
const handleAuth = require('../handleAuth/auth');

router.post('/register', handleAuth.register);

router.post('/login', handleAuth.login);

router.post('/logout', handleAuth.logout);

router.post('/refresh_token', handleAuth.generateAccessToken);

module.exports = router;
