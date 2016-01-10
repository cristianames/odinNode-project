app.controller("publicacionesController", ['$scope', '$location', 'PublicacionesFactory', function($scope, $location, PublicacionesFactory){
    $scope.publicacionDescripcion = "Inserte breve descripción.";
    $scope.publicacionContenido = "Inserte contenido.";
    $scope.publicacionCheckbox = true;  //Si no se pone en true entonces arranca undefined.

    $scope.onCancelar = function () {
        $location.path("/");
    }
    $scope.onGuardar = function(){
        var publicacion = {
            'titulo':$scope.publicacionTitulo,
            'contenido':$scope.publicacionDescripcion,
            'desarrollo':$scope.publicacionContenido,
            'contributiva':$scope.publicacionCheckbox,
            'etiquetas': {
                '1': { 'nombre': 'GoogleMaps' },
                '2': { 'nombre': 'OpenShift' }
            }};
        guardar(publicacion);
        $location.path("/");
    }
    $scope.onDescripcion = function(){
        $scope.publicacionDescripcion = null;
    }
    $scope.onContenido = function(){
        $scope.publicacionContenido = null;
    }

    var guardar = function(pub){
        PublicacionesFactory.insertPublicacion(pub)
            //.success(alert("Publicacion guardad exitosamente!"));
    }

}]);