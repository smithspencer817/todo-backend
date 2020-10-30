const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/', (req, res) => {
    const { username } = req.body;
    User.findOne({
        where: { username }
    })
    .then(user => {
        if (!user) {
            res.json('user not found')
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result == true) {
                    jwt.sign({user}, 'secretkey', (err, token) => {
                        res.json({
                            user: user['dataValues'],
                            token
                        });
                    });
                } else {
                    res.json('password did not match username');
                }
            });
        }
    });
});

module.exports = router;