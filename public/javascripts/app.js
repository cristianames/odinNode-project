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
        .when('/publicaciones/:id', {       //TODO LUCAS
            templateUrl: 'views/publicaciones/publicacion.html',
            controller: 'publicacionController'
        })
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
        .when('/usuarios/nuevo', {
            templateUrl: 'views/usuarios/registroUsuario.html',
            controller: 'usuarioController'
        })
        .when('/usuarios/login', {
            templateUrl: 'views/usuarios/loggin.html',
            controller: 'usuarioController'
        })
        .otherwise({
            redirectTo: '/error'
        });
});

app.factory('EtiquetaFactory', ['$http', function($http) {

    var urlBase = '/api/v1.0/etiqueta';
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

    var urlBase = '/api/v1.0/publicacion';
    var PublicacionesFactory = {};

    PublicacionesFactory.getPublicaciones = function () {
        return $http.get(urlBase);
    };

    PublicacionesFactory.getPublicacion = function (id) {
        return $http.get(urlBase + '/' + id);
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

app.factory('EquiposFactory', ['$http', function($http) {

    var urlBase = '/api/v1.0/equipo';
    var EquipoFactory = {};

    EquipoFactory.insertEquipo = function (equipo) {
        return $http.post(urlBase, equipo);
    };

    EquipoFactory.getEquipo = function(){
        return $http.get(urlBase);
    };


    return EquipoFactory;
}]);

app.factory('UsuariosFactory', ['$http', function($http) {

    var urlBase = '/api/v1.0/usuario';
    var UsuarioFactory = {};


    EquipoFactory.getUsuarios = function(){
        return $http.get(urlBase);
    };

    UsuarioFactory.insertUsuario = function (user) {
        return $http.post(urlBase, user);
    };


    return UsuarioFactory;
}]);

//
//app.factory("Etiqueta", ['$resource', function($resource) {
//
//    return $resource("/api/etiqueta/:id", null,
//        {
//            'query': { method:'GET', isArray: false }
//        });
//}]);
