
// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// register routes
var index = require('./routes/index');
var api = require('./routes/api');

// views as directory of all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entended: false}));
app.use(cookieParser());

// set routes handlers
app.use('/', index);
app.use('/api', api);

// setup socket io
io.on('connection', function(socket){
    console.log('a user connected');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// set server port
http.listen(3000, function(){
    console.log('server listening on *:3000');
});

//module.exports = app;
