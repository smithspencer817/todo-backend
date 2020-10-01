const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, username, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, username, password]
        );
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;