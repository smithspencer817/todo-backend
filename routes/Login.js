const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findAll({
            where: { username, password }
        })
        if (user[0]['dataValues']) {
            jwt.sign({user}, 'secretkey', (err, token) => {
                res.json({
                    user: user[0]['dataValues'],
                    token
                });
            });
        } else {
            res.json('no match');
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;