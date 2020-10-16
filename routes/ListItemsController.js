const express = require('express');
const router = express.Router();
const ListItem = require('../models/ListItem');

// GET ALL LIST ITEMS
router.get('/', (req, res) => {
    try {
        ListItem.findAll()
            .then(listItems => res.json(listItems))
            .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

// CREATE NEW LIST ITEM
router.post('/', async (req, res) => {
    try {
        const { description, list_id } = req.body;
        ListItem.create({ description, list_id })
        .then(listItem => res.json(listItem))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE A LIST ITEM
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        ListItem.update({ description }, {
            where: { id }
        })
        .then(res.json("list item was updated"))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE A LIST ITEM
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        ListItem.destroy({
            where: { id }
        })
        .then(res.json("list item deleted"))
        .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;