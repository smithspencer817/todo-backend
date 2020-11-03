const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models')
const List = models.List

// GET ALL LISTS
router.get('/', (req, res) => {
    List.findAll({
        include: 'listItems' 
    })
    .then(lists => res.json(lists))
    .catch(err => console.log(err));
});

// GET A SPECIFIC LIST
router.get('/:id', (req, res) => {
    const { id } = req.params;
    List.findOne({
        where: { id }, include: 'listItems'
    })
    .then(list => res.json(list))
    .catch(err => console.log(err));
});

// CREATE NEW LIST
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { name, userId } = req.body;
            List.create({ name, userId })
            .then(list => res.json({ list }))
            .catch(err => res.json(err.errors));
        }
    });
});

// UPDATE A LIST
router.put('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { id } = req.params;
            const { name } = req.body;
            List.update({ name }, {
                where: { id }
            })
            .then(res.json('list updated'))
            .catch(err => res.json(err.errors));
        }
    });
});

// DELETE A LIST
router.delete('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { id } = req.params;
            List.destroy({
                where: { id }
            })
            .then(res.json('list deleted'))
            .catch(err => res.json(err));
        }
    });
});

// VERIFY TOKEN
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