app.controller("mainController", ['$scope', 'PublicacionesFactory', function($scope, Publicaciones){
    $scope.pubs = {0: {titulo: "Cargando..."}};
    Publicaciones.getPublicaciones()
        .success(function (pubs) {
            $scope.pubs = pubs;
        })
}]);