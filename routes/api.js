var express = require('express');
var router = express.Router();

router.route('/steps')
    
    // get all steps
    .get(function(req, res){
        console.log('GET /steps');
        res.send({message: "TODO get all steps from the database"});
    });

module.exports = router;
