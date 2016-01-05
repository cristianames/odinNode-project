var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMap']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
        .when('/etiquetas', {
            templateUrl: 'views/etiquetas.html',
            controller: 'etiquetasController'
        })
        .when('/publicacion/nueva', {
            templateUrl: 'views/publicaciones/nuevaPublicacion.html',
            controller: 'publicacionesController'
        })
        .otherwise({
            redirectTo: '/error'
        });
});

app.factory("Etiqueta", ['$resource', function($resource) {

    return $resource("/api/etiqueta/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("Publicacion", ['$resource', function($resource) {

    return $resource("/api/publicacion/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);



