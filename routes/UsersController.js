const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const List = require('../models/List');
const User = require('../models/User');

// GET ALL USERS
router.get('/', (req, res) => {
    try {
        User.findAll()
            .then(users => res.json(users))
            .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// GET A SPECIFIC USER
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        User.findOne({
            where: { id }
        })
        .then(user => res.json(user))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// GET LISTS FOR A SPECIFIC USER
router.get('/:id/lists', (req, res) => {
    try {
        const { id } = req.params;
        List.findAll({
            where: { user_id: id }
        })
        .then(lists => res.json(lists))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// CREATE NEW USER
router.post('/', (req, res) => {
    const { first_name, last_name, username, password } = req.body
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        User.create({
            first_name,
            last_name,
            username,
            password: hash
        })
        .then(user => res.json(user))
        .catch(err => res.json(err.errors))
    });
});

// DELETE A USER
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        User.destroy({
            where: { id }
        })
        .then(res.json("account deleted"))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;