//var logger = require('morgan');

var app = angular.module('checklistapp', ['ngRoute', 'ngResource', 'ui.bootstrap']).run(function($http, $rootScope){
    $rootScope.application_title = 'Release Badger';
    $rootScope.application_subtext = 'You dont release the badger; the badger releases you!';
    $rootScope.is_authenticated = false;
    $rootScope.current_user = '';

    $rootScope.signout = function(){
        $http.get('auth/signout');
        $rootScope.is_authenticated = false;
        $rootScope.current_user = '';
    };
});

// setup routing
app.config(function($routeProvider, $locationProvider){
    $routeProvider

        .when('/', {
            templateUrl: 'main.html',
            controller: 'stepController',
            resolve: {
                factory: function($rootScope, $location){
                    if(!$rootScope.is_authenticated){
                        $location.path('/login');
                    }
                }
            }
        })

        .when('/login', {
            templateUrl: 'login.html',
            controller: 'authController'
        })

        .when('/register', {
            templateUrl: 'register.html',
            controller: 'authController'
        })

        .otherwise({
            rediretTo: '/login' 
        });
});

app.controller('stepController', function($scope, $rootScope, stepFactory, socketFactory){
    $scope.checklist_name = 'Software Release ( Version 2.2 )';
    $scope.error_message = '';
    $scope.chat_message = '';


    $scope.steps = stepFactory.resource.query();

    $scope.stepsCompleted = function(){
        return 3;
    };

    $scope.stepsCount = 6;

    $scope.showCompleteButton = function(step){
        return !step.done && $rootScope.is_authenticated;
    };

    $scope.setComplete = function(id){
        var updatedStep = {
            completed_by: $rootScope.current_user,
            completed_time: Date.now()
        };
        console.log(updatedStep);
        socketFactory.sendMessage($rootScope.current_user + ' has completed step ' + id);        
        stepFactory.resource.update({id: id}, updatedStep, function(){
            var updatedStep = {};
            $scope.steps = stepFactory.resource.query();
        });
    };

    $scope.sendChatMessage = function(){
        socketFactory.sendMessage($scope.chat_message);        
        $scope.chat_message = '';
    };
});

app.factory('stepFactory', function($resource){
    var factory = {};

    // resource factory for interacting with api webservice
    factory.resource = $resource('/api/steps/:id', { id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });

    return factory;
});

app.factory('socketFactory', function($rootScope){
    var factory = {};
    var socket = io.connect();

    socket.on('chat message', function(msg){
        alert(msg);
    });

    factory.sendMessage = function(msg){
        socket.emit('chat message', msg);
    };


    return factory;
});

app.controller('authController', function($scope, $rootScope, $http, $location, authFactory){
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.error_message = '';

    $scope.register = function(){
        authFactory.register($scope.user)
            .success(function(data){processSuccessResult(data);});
    };

    $scope.login = function(){
        authFactory.login($scope.user)
            .success(function(data){processSuccessResult(data);});
    };

    function processSuccessResult(data){
        if(data.state == 'success'){
            $rootScope.is_authenticated = true;
            $rootScope.current_user = data.user.username;
            $scope.error_message = '';
            $location.path('/');
        }else{
            $scope.error_message = 'Incorrect username or password';
        }
    }
});

app.factory('authFactory', function($http){
    var factory = {};

    // registers the user
    factory.register = function(user){
        return $http.post('/auth/register', user);
    };

    // login user
    factory.login = function(user){
        return $http.post('/auth/login', user);
    };

    return factory;
});


