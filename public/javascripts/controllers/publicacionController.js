app.controller("PublicacionesFactory", ['$scope', '$location', 'PublicacionesFactory', function(scope, location, Publicaciones){


    scope.onCancelar = function () {
        location.path("/");
    }
}]);
