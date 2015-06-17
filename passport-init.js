var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

var users = {};
module.exports = function(passport){

    //register
    passport.use('register', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done){
            //  check if user exists
            if(users[username]){
                console.log('user already exists with username ' + username);
                return done(null, false);
            }

            // save user
            users[username] = {
                username: username,
                password: createHash(password)
            }

            console.log(users[username].username + ' registration successful');
            return done(null, users[username]);
        }
    ));
   
    // Login
    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done){
            // check if user exists
            if(!users[username]){
                console.log('user not found with username ' + username);
                return done(null, false);
            }

            // check if password is correct 
            if(isValidPassword(users[username], password)){
                return done(null, users[username]);    
            }else{
                return done(null, false);    
            }
        }
    ));
    
    // passport needs to be able to serialize/deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done){
        console.log('serializing user');
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done){
        return done(null, users[username]);
    });

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };

    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
