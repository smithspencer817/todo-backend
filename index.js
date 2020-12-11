const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// HEROKU DATABASE
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ROUTES
app.use('/api/login', require('./routes/Login'));
app.use('/api/users', require('./routes/UsersController'));
app.use('/api/lists', require('./routes/ListsController'));
app.use('/api/list-items', require('./routes/ListItemsController'));

// HEROKU DATABASE
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
})

// SERVER
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});