const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

// IMPORTED ROUTES
const usersRoutes = require('./routes/Users');
const listsRoutes = require('./routes/Lists');
const listItemsRoutes = require('./routes/ListItems');

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MIDDLEWARE ROUTES
app.use('/users', usersRoutes);
app.use('/lists', listsRoutes);
app.use('/list-items', listItemsRoutes);

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
});