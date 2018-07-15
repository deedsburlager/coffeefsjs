//Must haves.
const path = require('path');
require('./models/file.model.js');
const router = require('./routes');
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
//Look here for what to do /routes
const mongoose = require('mongoose');
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`,{ useNewUrlParser: true });



//The app.
const app = express();

//Static Path to serve up Static pages
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));
app.use('/api', router);
//use the body parser for our server data
//app.use(function(req, res, next){
    //console.log('req.body before parsing', req.body);
    //next();
//})
//app.use(bodyParser.json());

//app.use(function(req, res, next){
    //console.log('req.body after parsing', req.body);
    //next();
//})
//This file should do this.
//Moved to src/routes/index.js

//Do it
app.listen(config.port, function(){
    console.log('${config.appName} is listening on port ${config.port}');
});