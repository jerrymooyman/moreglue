
// set variables for environment
var session = require('express-session');           //session
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);             //for calling api
var io = require('socket.io')(http);                //broadcasting messages
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var expressJwt = require('express-jwt');             //auth
var jwt = require('jsonwebtoken');                   //auth

var mongoose = require('mongoose');
//var configDB = require('./config/database.js');
//mongoose.connect(configDB.url);

// register routes
var index = require('./routes/index');
var api = require('./routes/api');
var auth = require('./routes/auth')(passport);


// views as directory of all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entended: false}));
app.use(cookieParser());
app.use(session({ secret: 'badger'}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());

var jwtCheck = expressJwt({
    secret: 'secret'
});

// set routes handlers
app.use('/', index);
app.use('/auth', auth);
//app.use('/api', jwtCheck);
app.use('/api', api);

// setup socket io
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// initialise passport
var initPassport = require('./passport-init');
initPassport (passport);

// set server port
http.listen(3000, function(){
    console.log('server listening on *:3000');
});

module.exports = app;
