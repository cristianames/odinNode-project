app.controller("publicacionesController", ['$scope','PublicacionesFactory','$location',   function($scope, Publicaciones,$location){

    $scope.dato = "Por ahora nada";

    $scope.publicaciones = {0: {data: {titulo: "Cargando..."}}};
    Publicaciones.getPublicaciones()
        .success(function (publicacioness) {
            $scope.publicaciones = publicacioness;
        })

    $scope.abrirPublicacion = function(publicacion){ //NO CONVIENE RECIBIR SOLO EL ID? ES TRAER INFO AL PEDO
        console.log("Objeto Pub:");
        console.log(publicacion.id);
        $location.path('/publicaciones/' + publicacion.id)
    }
}]);