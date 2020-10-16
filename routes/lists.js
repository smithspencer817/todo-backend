const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const List = require('../models/List')

// GET ALL LISTS
router.get('/', async (req, res) => {
    try {
        List.findAll()
            .then(lists => res.json(lists))
            .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// GET A SPECIFIC LIST
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        List.findAll({
            where: { id }
        })
        .then(list => res.json(list))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// GET ITEMS FROM A SPECIFIC LIST
router.get('/:id/list-items', async (req, res) => {
    try {
        const { id } = req.params;
        const listItems = await db.query(`SELECT * FROM list_items WHERE list_id = ${id}`);
        res.json(listItems.rows);
    } catch {
        console.error(err);
    }
});

// CREATE NEW LIST
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const { name, user_id } = req.body;
                List.create({ name, user_id })
                .then(list => res.json({ list, authData }))
                .catch(err => console.log(err));
            } catch (err) {
                console.error(err.message);
            }
        }
    });
});

// UPDATE A LIST
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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