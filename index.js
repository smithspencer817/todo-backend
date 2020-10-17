const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ROUTES
app.use('/api/login', require('./routes/Login'));
app.use('/api/users', require('./routes/UsersController'));
app.use('/api/lists', require('./routes/ListsController'));
app.use('/api/list-items', require('./routes/ListItemsController'));

// SERVER
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});