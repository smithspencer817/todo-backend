const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const models = require('../models')
const List = models.List
const User = models.User


// GET ALL USERS
router.get('/', (req, res) => {
    User.findAll()
    .then(users => res.send(users))
    .catch(err => res.json(err))
});

// GET A SPECIFIC USER
router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.findOne({
        where: { id }
    })
    .then(user => res.json(user))
    .catch(err => console.log(err))
});

// GET LISTS FOR A SPECIFIC USER
router.get('/:id/lists', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { id } = req.params;
            List.findAll({
                where: { userId: id }, include: 'listItems'
            })
            .then(lists => res.json(lists))
            .catch(err => console.log(err))
        }
    });
});

// CREATE NEW USER
router.post('/', (req, res) => {
    const { firstName, lastName, username, password } = req.body
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        User.create({
            firstName,
            lastName,
            username,
            password: hash
        })
        .then(user => {
            jwt.sign({user}, 'secretkey', (err, token) => {
                res.json({
                    user: user['dataValues'],
                    token
                });
            });
        })
        .catch(err => res.json(err.errors))
    });
});

// DELETE A USER
router.delete('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { id } = req.params;
            User.destroy({
                where: { id }
            })
            .then(res.json("account deleted"))
            .catch(err => console.log(err));
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;