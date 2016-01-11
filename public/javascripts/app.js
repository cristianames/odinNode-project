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
        .when('/publicacion/dashboard', {
            templateUrl: 'views/publicaciones/dashboardPublicacion.html',
            controller: 'dashboardPublicacionController'
        })
        .otherwise({
            redirectTo: '/error'
        });
});

app.factory('EtiquetaFactory', ['$http', function($http) {

    var etiquetas = new Firebase('https://odingrid.firebaseio.com/etiquetas');
    var urlBase = '/api/etiqueta';
    var EtiquetaFactory = {};

    EtiquetaFactory.getEtiquetas = function () {
        return $http.get(urlBase, etiquetas);
    };

    EtiquetaFactory.getEtiqueta = function (id) {
        return $http.get(urlBase + '/:' + id);
    };

    EtiquetaFactory.insertEtiqueta = function (etiq) {
        return $http.post(urlBase, etiq);
    };

    EtiquetaFactory.updateEtiqueta = function (etiq) {
        return $http.put(urlBase + '/:' + etiq.ID, etiq)
    };

    EtiquetaFactory.deleteEtiqueta = function (id) {
        return $http.delete(urlBase + '/:' + id);
    };

    return EtiquetaFactory;
}]);

app.factory('PublicacionesFactory', ['$http', function($http) {

    var urlBase = '/api/publicacion';
    var PublicacionesFactory = {};

    PublicacionesFactory.getPublicaciones = function () {
        return $http.get(urlBase);
    };

    PublicacionesFactory.getPublicacion = function (id) {
        return $http.get(urlBase + '/:' + id);
    };

    PublicacionesFactory.insertPublicacion = function (pub) {
        return $http.post(urlBase, pub);
    };

    PublicacionesFactory.updatePublicacion = function (pub) {
        return $http.put(urlBase + '/:' + pub.ID, pub)
    };

    PublicacionesFactory.deletePublicacion = function (id) {
        return $http.delete(urlBase + '/:' + id);
    };

    return PublicacionesFactory;
}]);

//
//app.factory("Etiqueta", ['$resource', function($resource) {
//
//    return $resource("/api/etiqueta/:id", null,
//        {
//            'query': { method:'GET', isArray: false }
//        });
//}]);
