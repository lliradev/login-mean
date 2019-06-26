const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', user.register);
router.post('/authenticate', user.authenticate);
router.get('/profile', jwtHelper.verifyJwtToken, user.userProfile);

module.exports = router;