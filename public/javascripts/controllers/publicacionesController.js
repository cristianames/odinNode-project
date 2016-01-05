app.controller("publicacionesController", function($scope, $location){
    $scope.publicacionDescripcion = "Inserte breve descripción.";
    $scope.publicacionContenido = "Inserte contenido.";

    $scope.onCancelar = function () {
        $location.path("/");
    }
    $scope.onGuardar = function(){
        alert("Publicacion guardad exitosamente!");
        $location.path("/");
    }
    $scope.onDescripcion = function(){
        $scope.publicacionDescripcion = null;
    }
    $scope.onContenido = function(){
        $scope.publicacionContenido = null;
    }


});