var express = require('express'),
	path = require('path'),
	config = require(path.join(__dirname, 'config/config.js')),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser')


mongoose.connect(config.dbURL);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('host', config.host);

app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);


var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(app.get('port'), function() {
	console.log("Utility Percentiles running on port " + app.get('port'));
})


require(path.join(__dirname, 'routes/routes.js'))(express, app, bodyParser, mongoose);


