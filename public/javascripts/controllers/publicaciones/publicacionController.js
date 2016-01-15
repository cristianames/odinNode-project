app.controller("PublicacionFactory", ['$scope', '$location', 'PublicacionesFactory', '$routeParams', function(scope, location, Publicaciones, routeParams){

    Publicaciones.getPublicacion(routeParams.id)
        .success(function (pub) {
            $scope.pub = pub;
        })

    scope.onCancelar = function () {
        location.path("/");
    }
}]);
