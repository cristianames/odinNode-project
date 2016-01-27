app.controller("nuevaPublicacionController", ['$scope', '$location', 'PublicacionesFactory', '$rootScope', function(scope, location, Publicaciones, $rootScope){
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
            'descripcion':scope.publicacionDescripcion,
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
        Publicaciones.insertPublicacion(pub,
            function(res){
                console.log("Returned is:");
                console.log(res.data);
                $rootScope.pubs = res.data;
                location.path("/");
            },function(res){
                scope.guardar = "Error!"
                //TODO Hacer que espere un rato y vuelva a estar normal.
            });
    }

}]);
