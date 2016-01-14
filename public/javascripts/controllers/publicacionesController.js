//SI DESGLOSAN ESTE ARCHIVO EN VARIOS JS, PRIMERO CREEN UNA CARPETA QUE LOS CONTENGA A TODOS
app.controller("nuevaPublicacionController", ['$scope', '$location', 'PublicacionesFactory', function(scope, location, Publicaciones){
    scope.publicacionDescripcion = "Inserte breve descripción.";
    scope.publicacionContenido = "Inserte contenido.";
    scope.publicacionCheckbox = true;  //Si no se pone en true entonces arranca undefined.

    scope.onCancelar = function () {
        location.path("/");
    }
    scope.onGuardar = function(){
        var publicacion = {
            'titulo':scope.publicacionTitulo,
            'contenido':scope.publicacionDescripcion,
            'desarrollo':scope.publicacionContenido,
            'contributiva':scope.publicacionCheckbox,
            'etiquetas': {
                '1': { 'nombre': 'GoogleMaps' },
                '2': { 'nombre': 'OpenShift' }
            }};
        guardar(publicacion);
        location.path("/");
    }
    scope.onDescripcion = function(){
        if(!scope.publicacionDescripcion.localeCompare("Inserte breve descripción.")) scope.publicacionDescripcion = null;
    }
    scope.onContenido = function(){
        if(!scope.publicacionContenido.localeCompare("Inserte contenido.")) scope.publicacionContenido = null;
    }

    var guardar = function(pub){
        Publicaciones.insertPublicacion(pub)
            //.success(alert("Publicacion guardad exitosamente!"));
    }

}]);

app.controller("publicacionesController", ['$scope','PublicacionesFactory','$location',   function($scope, Publicaciones,$location){

    $scope.publicaciones = {0: {titulo: "Cargando..."}};
    Publicaciones.getPublicaciones()
        .success(function (publicacioness) {
            $scope.publicaciones = publicacioness;
            console.log("Publicaciones:")

        })
    $scope.abrirPublicacion = function(publicacion){
        $location.path('/publicaciones/:' + publicacion.id)
    }
}]);