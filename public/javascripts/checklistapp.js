//var logger = require('morgan');

var app = angular.module('checklistapp', ['ngRoute', 'ngResource', 'ui.bootstrap']).run(function($http, $rootScope){
    $rootScope.application_title = 'Release Badger';
    $rootScope.application_subtext = 'You dont release the badger; the badger releases you!';
    $rootScope.is_authenticated = false;
    $rootScope.current_user = '';

    $rootScope.signout = function(){
        
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

app.controller('stepController', function($scope, $rootScope){
    $scope.checklist_name = 'Software Release ( Version 2.2 )';
    $scope.error_message = '';
});

app.controller('authController', function($scope, $rootScope, $http, $location, authFactory){
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.error_message = '';

    $scope.register = function(){
        authFactory.register($scope.user)
            .success(function(data){
                if(data.state == 'success'){
                    $rootScope.is_authenticated = true;
                    $rootScope.current_user = data.user.username;
                    $location.path('/');
                }else{
                    $scope.error_messsage = data.message;
                }
            }
        );
    };

});

app.factory('authFactory', function($http){
    var factory = {};

    // registers the user
    factory.register = function(user){
        console.log('Calling authController:register');
        return $http.post('/auth/register', user);
    };

    return factory;
});


