var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMap']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
        .when('/etiquetas', {
            templateUrl: 'views/etiquetas/etiquetas.html',
            controller: 'etiquetasController'
        })
        .when('/publicaciones/nuevo', {
            templateUrl: 'views/publicaciones/nuevaPublicacion.html',
            controller: 'nuevaPublicacionController'
        })
        .when('/publicaciones', {
            templateUrl: 'views/publicaciones/publicaciones.html',
            controller: 'publicacionesController'
        })
        //.when('/publicaciones/:id', {       //TODO LUCAS
        //    templateUrl: 'ALGUNA.html',
        //    controller: 'ALGUNController'
        //})
        //.when('/publicaciones/:id/editar', {        //TODO LUCAS
        //    //No se si se puede esa ruta, por los :
        //    //Otra opcion sería /publicaciones/editar/:id
        //    templateUrl: 'ALGUNA.html',
        //    controller: 'ALGUNController'
        //})
        .when('/equipos/nuevo', {
            templateUrl: 'views/equipos/equipoNuevo.html',
            controller: 'equiposController'
        })
        .otherwise({
            redirectTo: '/error'
        });
});

app.factory('EtiquetaFactory', ['$http', function($http) {

    var urlBase = '/api/etiqueta';
    var EtiquetaFactory = {};

    EtiquetaFactory.getEtiquetas = function () {
        return $http.get(urlBase);
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

app.factory('EquipoFactory', ['$http', function($http) {

    var urlBase = '/api/equipo';
    var EquipoFactory = {};
    return EquipoFactory;
}]);

//
//app.factory("Etiqueta", ['$resource', function($resource) {
//
//    return $resource("/api/etiqueta/:id", null,
//        {
//            'query': { method:'GET', isArray: false }
//        });
//}]);
