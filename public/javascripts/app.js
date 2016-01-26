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
        .when('/equipos/:id/dashboard/', {
            templateUrl: 'views/equipos/dashboard/dashboard.html',
            controller: 'dashboardController'
        })
        .when('/equipos/:id/dashboard/:page', {
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

    EquipoFactory.getEquipo = function(idEquipo) {
        return $http.get(urlBase + '/' + idEquipo);
    };

    EquipoFactory.insertIntegrante = function (idEquipo, integrante) {
        return $http.post(urlBase + '/' + idEquipo + '/integrantes', integrante);
    }

    EquipoFactory.quitarIntegrante = function (idEquipo, username) {
        return $http.delete(urlBase + '/' + idEquipo + '/integrantes/' + username);
    }

    EquipoFactory.crearPropuesta = function (idEquipo, propuesta) {
        return $http.post(urlBase + '/' + idEquipo + '/propuestas', propuesta);
    }

    EquipoFactory.quitarPropuesta = function (idEquipo, idPropuesta) {
        return $http.delete(urlBase + '/' + idEquipo + '/propuestas/' + idPropuesta);
    }

    EquipoFactory.editarPropuesta = function (idEquipo, idPropuesta, propuesta) {
        return $http.put(urlBase + '/' + idEquipo + '/propuestas/' + idPropuesta, propuesta);
    }

    return EquipoFactory;
}]);

app.factory('UsuariosFactory', ['$http', function($http) {

    var urlBase = '/api/v1.0/usuario';
    var UsuarioFactory = {};

    UsuarioFactory.insertUsuario = function (user) {
        return $http.post(urlBase, user);
    };

    UsuarioFactory.getUsuarios = function () {
        return $http.get(urlBase);
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

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);