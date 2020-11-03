const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models')
const User = models.User

router.post('/', (req, res) => {
    const { username } = req.body;
    User.findOne({
        where: { username }
    })
    .then(user => {
        if (!user) {
            res.json('username not found')
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