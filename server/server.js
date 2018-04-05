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

app.use(express.static('client/build'));

require('./routes/bookRoutes')(app);
require('./routes/userRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
