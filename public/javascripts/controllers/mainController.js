app.controller("mainController", ['$scope', 'PublicacionesFactory', function($scope, Publicaciones){
    $scope.pubs = {0: {data: {titulo: "Cargando..."}}};
    Publicaciones.getPublicaciones()
        .success(function (pubs) {
            $scope.pubs = pubs;
            //console.log("Publicaciones-Index:")
            //console.log(pubs);
        })
}]);