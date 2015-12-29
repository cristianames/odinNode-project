var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMap']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'mainController'
      })
      .when('/app', {
        templateUrl: 'views/home.html',
        controller: 'mainController'
      })
      .when('/app/etiquetas', {
        templateUrl: 'views/etiquetas.html',
        controller: 'etiquetasController'
      })
      .otherwise({
        redirectTo: '/error'
      });
});

app.factory("Etiqueta", ['$resource', function($resource) {

  return $resource("/_ah/api/partidosmanager/v1/etiqueta/:id", null,
      {
        'query': { method:'GET', isArray: false }
      });
}]);

app.controller("mainController", function(){

});

app.controller('etiquetasController', function($scope, Etiqueta) {
  Etiqueta.query(function(data){
    $scope.tags = data.items;
  });
});
