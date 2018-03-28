const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);

const { User } = require('./models/user');
const { Book } = require('./models/book');

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
