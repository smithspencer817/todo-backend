const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users')

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use('/users', usersRoute)

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})