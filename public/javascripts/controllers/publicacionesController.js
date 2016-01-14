//SI DESGLOSAN ESTE ARCHIVO EN VARIOS JS, PRIMERO CREEN UNA CARPETA QUE LOS CONTENGA A TODOS
app.controller("nuevaPublicacionController", ['$scope', '$location', 'PublicacionesFactory', function(scope, location, Publicaciones){
    scope.publicacionDescripcion = "Inserte breve descripción.";
    scope.publicacionContenido = "Inserte contenido.";
    scope.publicacionCheckbox = true;  //Si no se pone en true entonces arranca undefined.
    scope.guardar = "Guardar";

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
        scope.guardar = "Guardando.."
    }
    scope.onDescripcion = function(){
        if(!scope.publicacionDescripcion.localeCompare("Inserte breve descripción.")) scope.publicacionDescripcion = null;
    }
    scope.onContenido = function(){
        if(!scope.publicacionContenido.localeCompare("Inserte contenido.")) scope.publicacionContenido = null;
    }

    var guardar = function(pub){
        Publicaciones.insertPublicacion(pub)
            .success(function(returned){
                location.path("/");
            });
    }

}]);

app.controller("publicacionesController", ['$scope','PublicacionesFactory','$location',   function($scope, Publicaciones,$location){

    $scope.dato = "Por ahora nada";

    $scope.publicaciones = {0: {data: {titulo: "Cargando..."}}};
    Publicaciones.getPublicaciones()
        .success(function (publicacioness) {
            $scope.publicaciones = publicacioness;
        })

    $scope.abrirPublicacion = function(publicacion){
        console.log("Objeto Pub:");
        console.log(publicacion.id);
        $location.path('/publicaciones/:' + publicacion.id)
    }
}]);