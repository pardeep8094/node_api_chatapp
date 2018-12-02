var express = require('express');
app = express();
port = process.env.PORT || 8080;
mongoose = require('mongoose');
groups = require('./api/models/groupModel');
customers = require('./api/models/customersModel');
chats = require('./api/models/chatsModel');

bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/messenger', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

var routes = require('./api/routes/Routes');
routes(app); 

app.listen(port);