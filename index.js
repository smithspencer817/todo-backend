const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

// IMPORTED ROUTES
const loginRoutes = require('./routes/Login');
const usersRoutes = require('./routes/Users');
const listsRoutes = require('./routes/Lists');
const listItemsRoutes = require('./routes/ListItems');

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MIDDLEWARE ROUTES
app.use('/api/login', loginRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/lists', listsRoutes);
app.use('/api/list-items', listItemsRoutes);

// SERVER
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});