//Must haves.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('./models/file.model.js');
const config = require('./config');
//Look here for what to do /routes
const mongoose = require('mongoose');
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`,{ useNewUrlParser: true });
//The app.
const app = express();

//Static Path to serve up Static pages
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
const router = require('./routes');
app.use(express.static(publicPath));
app.use('/api', router);

//This file should do this.
//Moved to src/routes/index.js

//Do it
app.listen(config.port, function(){
    console.log(`${config.appName} is listening on port ${config.port}`);
});