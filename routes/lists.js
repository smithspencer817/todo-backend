const express = require('express');
const router = express.Router();
const db = require('../db');

// GET ALL LISTS
router.get('/', async (req, res) => {
    try {
        const allLists = await db.query("SELECT * FROM lists");
        res.json(allLists.rows);
    } catch (err) {
        console.error(err);
    }
});

// GET A SPECIFIC LIST
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const list = await db.query(`SELECT * FROM lists WHERE id = ${id}`);
        res.json(list.rows[0]);
    } catch (err) {
        console.error(err);
    }
});

// CREATE NEW LIST
router.post('/', async (req, res) => {
    try {
        const { name, user_id } = req.body;
        const newList = await db.query(
            "INSERT INTO lists (name, user_id) VALUES($1, $2) RETURNING *",
            [name, user_id]
        );
        res.json(newList.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE A LIST
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await db.query(
            "UPDATE lists SET name = $1 WHERE id = $2",
            [name, id]
        );
        res.json("list was updated")
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE A LIST
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query(`DELETE FROM lists WHERE id = ${id}`);
        res.json('list deleted');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;