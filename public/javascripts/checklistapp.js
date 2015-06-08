var app = angular.module('checklistapp', ['ngRoute', 'ngResource', 'ui.bootstrap']).run(function($http, $rootScope){
    $rootScope.application_title = 'Release Badger';
    $rootScope.application_subtext = 'You dont release the badger; the badger releases you!';
});

// setup routing
app.config(function($routeProvider){
    $routeProvider

        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        });
});

app.controller('mainController', function($scope, $rootScope){
    $scope.checklist_name = 'Software Release ( Version 2.2 )';
});
