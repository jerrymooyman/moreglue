var express = require('express');
var router = express.Router();

// used for routes that must be authenticated
function isAuthenticated(req, res, next){
    
    // allow all /GET requests
    if(req.method == 'GET'){
        return next();
    }

    // allow any request where the user is authenticated
    if(req.isAuthenticated()){
        return next();
    }

    // for anything else, redirect to login page
    return res.redirect('/#login');
}

router.use('/steps', isAuthenticated);

router.route('/steps')
    
    // get all steps
    .get(function(req, res){
        console.log('GET /steps');
        res.send({message: "TODO get all steps from the database"});
    });

module.exports = router;
