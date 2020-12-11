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
            res.status(404).send(
                { message: 'user not found' }
            )
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result == true) {
                    jwt.sign({user}, 'secretkey', (err, token) => {
                        res.cookie('token', token, { httpOnly: true });
                        res.json({ token, user })
                    });
                } else {
                    res.status(401).send(
                        { message: 'password did not match username' }
                    );
                }
            });
        }
    });
});

module.exports = router;