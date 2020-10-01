const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

// IMPORTED ROUTES
const usersRoutes = require('./routes/users');
const listsRoutes = require('./routes/lists')

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/lists', listsRoutes);

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
});