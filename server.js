const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//Port
const port = 3000;

const config = require('./config/database');
const router = require('./server/routes/router');

//Set up View Engine
app.set('views', path.join(__dirname, '/server/views'))
app.set('view engine', 'ejs');

//Connect to MongoDB
mongoose.connect(config.database, { useNewUrlParser: true });

//On MongoDB Connection
mongoose.connection.on('connected', function(req, res) {
	console.log('Connected to database: ' + config.database);
});

//On MongoDB Error 
mongoose.connection.on('error', function(err) {
	console.log('DATABASE ERROR: ' + err);
});

//Body-Parser Middleware
app.use(bodyParser.json());

//Set Static Folder
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', router);

//Start Server
app.listen(port, function(){
	console.log('Server started on port ' + port)
});

exports = module.exports = app;