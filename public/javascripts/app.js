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
        .when('/publicaciones/:id', {
            templateUrl: 'views/publicaciones/publicacion.html',
            controller: 'publicacionController'
        })
        .when('/publicaciones/:id/editar', {
            templateUrl: 'views/publicaciones/nuevaPublicacion.html',
            controller: 'editarPublicacionController'
        })
        .when('/equipos/nuevo', {
            templateUrl: 'views/equipos/equipoNuevo.html',
            controller: 'equiposController'
        })
        .when('/equipos/:id/dashboard', {
            templateUrl: 'views/equipos/dashboard/dashboard.html',
            controller: 'dashboardController'
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

    PublicacionesFactory.updatePublicacion = function (id, pub) {
        return $http.put(urlBase + '/' + id, pub)
    };

    PublicacionesFactory.deletePublicacion = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return PublicacionesFactory;
}]);

app.factory('EquiposFactory', ['$http', function($http) {

    var urlBase = '/api/equipos';
    var EquipoFactory = {};

    EquipoFactory.insertEquipo = function (equipo) {
        return $http.post(urlBase, equipo);
    };

    EquipoFactory.getEquipos = function(){
        return $http.get(urlBase);
    };

    EquipoFactory.getEquipo = function(id, callback) {
        $http.get(urlBase + '/' + id).then(callback);
    };

    EquipoFactory.insertIntegrante = function (id, integrante, callback, errorCallback) {
        $http.post(urlBase + '/' + id + '/integrantes', integrante)
            .then(callback, errorCallback);
    }

    EquipoFactory.quitarIntegrante = function (id, username, callback, errorCallback) {
        $http.delete(urlBase + '/' + id + '/integrantes/' + username)
            .then(callback, errorCallback);
    }

    return EquipoFactory;
}]);

app.factory('UsuariosFactory', ['$http', function($http) {

    var urlBase = '/api/v1.0/usuario';
    var UsuarioFactory = {};

    UsuarioFactory.insertUsuario = function (user) {
        return $http.post(urlBase, user);
    };

    UsuarioFactory.getUsuarios = function (callback) {
        $http.get(urlBase).then(callback);
    }

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
