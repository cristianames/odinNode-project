app.controller("mainController", ['$scope', 'PublicacionesFactory', function($scope, Publicaciones){
    Publicaciones.getPublicaciones()
        .success(function (pubs) {
            $scope.pubs = pubs;
            console.log("Publicaciones:")
            console.log(pubs);
        })
}]);