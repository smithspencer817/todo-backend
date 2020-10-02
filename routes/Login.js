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
        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({token});
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;