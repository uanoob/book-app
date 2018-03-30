const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);

app.use(bodyParser.json());
app.use(cookieParser());

require('./routes/bookRoutes')(app);
require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
