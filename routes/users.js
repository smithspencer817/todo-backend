const express = require('express');
const router = express.Router();
const db = require('../db');

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const allUsers = await db.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err);
    }
})

// GET A SPECIFIC USER
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err);
    }
})

// GET LISTS FOR A SPECIFIC USER
router.get('/:id/lists', async (req, res) => {
    try {
        const { id } = req.params;
        const lists = await db.query(`SELECT * FROM lists WHERE user_id = ${id}`);
        res.json(lists.rows);
    } catch (err) {
        console.error(err);
    }
});

// CREATE NEW USER
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, username, password } = req.body;
        const newUser = await db.query(
            "INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, username, password]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE A USER
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query(`DELETE FROM users WHERE id = ${id}`);
        res.json('user deleted');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;