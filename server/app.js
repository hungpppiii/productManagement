// load env variables
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const route = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

// enables CORS
app.use(cors());

// dev logging
app.use(morgan('combined'));

// parse cookie
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

// parse application/json
app.use(bodyParser.json());

// set static folder
app.use('/static', express.static(path.join(__dirname, 'public')));

route(app);

module.exports = app;
