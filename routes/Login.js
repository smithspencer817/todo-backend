const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );
        if (user.rows.length) {
            jwt.sign({user}, 'secretkey', (err, token) => {
                res.json({
                    user: user.rows[0],
                    token
                });
            });
        } else {
            res.json('no match');
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;