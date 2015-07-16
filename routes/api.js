var express = require('express');
var router = express.Router();

var steps = [
    { number: 1, process: 'Take database backups', done: false, completed_by: '', completed_time: '', 
        sub_steps: [
            { number: 1, process: 'Take internal database server backup'},
            { number: 2, process: 'Take external database server backup'}
        ]},
    { number: 2, process: 'Place sitefinity in maintenance mode', done: false, completed_by: '', completed_time: ''},
    { number: 3, process: 'Pre solution deployment - remove CRM bindings', done: false, completed_by: '', completed_time: ''},
    { number: 4, process: 'CRM deployment', done: false, completed_by: '', completed_time: ''},
    { number: 5, process: 'Intranet deplyment', done: false, completed_by: '', completed_time: ''},
    { number: 6, process: 'DMZ deplyment', done: false, completed_by: '', completed_time: ''}
];

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

    //for anything else, redirect to login page
    return res.redirect('/#login');
}

router.use('/steps', isAuthenticated);

router.route('/steps')
    
    // get all steps
    .get(function(req, res){
        console.log('GET /steps');
        res.status(200).send(steps);
    });

router.route('/steps/:id')

    // get a step
    .get(function(req, res){
        console.log('GET /steps/:id');
        var step = getStep(getStepId(req)); 
        res.status(200).send(step);
    })

    // update a step
    .put(function(req, res){
        console.log(req.body);
        console.log('PUT /steps/:id');
        var step = getStep(getStepId(req)); 
        if(step){
            step.done = true;
            step.completed_by = req.body.completed_by;
            step.completed_time = req.body.completed_time;
            res.status(200).send(step);
        }
        res.send({message: 'could not find step with id'});
    });

function getStepId(req){
    return req.params.id.replace(':', '');
}

function getStep(id){
    return steps.filter(function(step){
        return step.number == id; 
    })[0];
}

module.exports = router;
