const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const List = require('../models/List')
const ListItem = require('../models/ListItem');

// GET ALL LISTS
router.get('/', (req, res) => {
    try {
        List.findAll()
            .then(lists => res.json(lists))
            .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// GET A SPECIFIC LIST
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        List.findOne({
            where: { id }
        })
        .then(list => res.json(list))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// GET ITEMS FROM A SPECIFIC LIST
router.get('/:id/list-items', (req, res) => {
    try {
        const { id } = req.params;
        ListItem.findAll({
            where: { list_id: id }
        })
        .then(listItems => res.json(listItems))
        .catch(err => console.log(err));
    } catch {
        console.error(err);
    }
});

// CREATE NEW LIST
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const { name, user_id } = req.body;
                List.create({ name, user_id })
                .then(list => res.json({ list, authData }))
                .catch(err => res.json(err.errors));
            } catch (err) {
                console.error(err.message);
            }
        }
    });
});

// UPDATE A LIST
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        List.update({ name }, {
            where: { id }
        })
        .then(res.json("list was updated"))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE A LIST
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        List.destroy({
            where: { id }
        })
        .then(res.json("list deleted"))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// VERIFY TOKEN
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken
        // next middleware
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;