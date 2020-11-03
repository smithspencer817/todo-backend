const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models')
const ListItem = models.ListItem

// GET ALL LIST ITEMS
router.get('/', (req, res) => {
    ListItem.findAll()
    .then(listItems => res.json(listItems))
    .catch(err => console.log(err));
});

// CREATE NEW LIST ITEM
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { description, listId } = req.body;
            ListItem.create({ description, listId })
            .then(listItem => res.json(listItem))
            .catch(err => console.log(err));
        }
    });
});

// UPDATE A LIST ITEM
router.put('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { id } = req.params;
            const { description } = req.body;
            ListItem.update({ description }, {
                where: { id }
            })
            .then(res.json("list item was updated"))
            .catch(err => console.log(err));
        }
    });
});

// DELETE A LIST ITEM
router.delete('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { id } = req.params;
            ListItem.destroy({
                where: { id }
            })
            .then(res.json("list item deleted"))
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