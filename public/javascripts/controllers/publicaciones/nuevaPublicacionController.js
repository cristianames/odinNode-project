app.controller("nuevaPublicacionController", ['$scope', '$location', 'PublicacionesFactory', function(scope, location, Publicaciones){
    scope.publicacionDescripcion = "Inserte breve descripción.";
    scope.publicacionDesarrollo = "Inserte contenido.";
    scope.publicacionCheckbox = true;  //Si no se pone en true entonces arranca undefined.
    scope.nombreBtn = "Guardar";
    scope.tituloNavbar = "Nueva publicacion";

    scope.onCancelar = function () {
        location.path("/");
    }
    scope.onGuardar = function(){
        var publicacion = {
            'titulo':scope.publicacionTitulo,
            'descripcion':scope.publicacionDescripcion,
            'desarrollo':scope.publicacionDesarrollo,
            'contributiva':scope.publicacionCheckbox,
            'etiquetas': {
                '1': { 'nombre': 'GoogleMaps' },
                '2': { 'nombre': 'OpenShift' }
            }};
        guardar(publicacion);
        scope.nombreBtn = "Guardando.."
    }
    scope.onDescripcion = function(){
        if(!scope.publicacionDescripcion.localeCompare("Inserte breve descripción.")) scope.publicacionDescripcion = null;
    }
    scope.onContenido = function(){
        if(!scope.publicacionDesarrollo.localeCompare("Inserte contenido.")) scope.publicacionDesarrollo = null;
    }

    var guardar = function(pub){
        Publicaciones.insertPublicacion(pub)
            .success(function(returned){
                console.log("Returned is:");
                console.log(returned);
                location.path("/");
            })
            .error(function(returned){
                scope.guardar = "Error!"
                //TODO(Lucas) Hacer que espere un rato y vuelva a estar normal.
            })
    }

}]);
