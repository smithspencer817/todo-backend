const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE NEW LIST ITEM
router.post('/', async (req, res) => {
    try {
        const { description, list_id } = req.body;
        const newListItem = await db.query(
            "INSERT INTO list_items (description, list_id) VALUES($1, $2) RETURNING *",
            [description, list_id]
        );
        res.json(newListItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE A LIST ITEM
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await db.query(
            "UPDATE list_items SET description = $1 WHERE id = $2",
            [description, id]
        );
        res.json("list item updated");
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE A LIST ITEM
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query(`DELETE FROM list_items WHERE id = ${id}`);
        res.json('list item deleted');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;