const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const dotenv = require('dotenv');

// load env variables
dotenv.config();

require('./models');

const sequelize = require('./config/db')

const app = express();

// enables CORS
app.use(cors());

// dev logging
app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// set static folder
app.use('/static', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello!")
})

async function setupConnect(params) {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            force: true,
        });
        console.log('Connection database successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log('Connection failure!', error)
    }
}

setupConnect();