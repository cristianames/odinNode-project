app.controller("editarPublicacionController", ['$scope', '$location', 'PublicacionesFactory', '$routeParams', function(scope, location, Publicaciones, routeParams){

    var publicacion = {};

    Publicaciones.getPublicacion(routeParams.id)
        .success(function (pub) {
            publicacion = pub;
            scope.publicacionCheckbox = publicacion.data.contributiva;
            scope.publicacionDesarrollo = publicacion.data.desarrollo;
            if(!publicacion.data.descripcion)                               //TODO Deprecated
                scope.publicacionDescripcion = publicacion.data.contenido;  //Deprecated
            else                                                            //Deprecated
                scope.publicacionDescripcion = publicacion.data.descripcion
            scope.publicacionTitulo = publicacion.data.titulo;

            scope.etiquetas = publicacion.data.etiquetas;
            scope.nombreBtn = "Actualizar";
            scope.tituloNavbar = "Editar publicacion";
        });



    scope.onCancelar = function () {
        location.path("/publicaciones/" + publicacion.id);
    }
    scope.onGuardar = function(){
        var pub = {
            'data': {
                'titulo':scope.publicacionTitulo,
                'descripcion':scope.publicacionDescripcion,
                'desarrollo':scope.publicacionDesarrollo,
                'contributiva':scope.publicacionCheckbox,
                'etiquetas': {
                    '1': {'nombre': 'GoogleMaps'},
                    '2': {'nombre': 'OpenShift'}
                }
            },
            'id': publicacion.id
        };

        actualizar(pub);
        scope.nombreBtn = "Actualizando..";
        location.path("/publicaciones/" + publicacion.id);
    }

    var actualizar = function(pub){
        Publicaciones.updatePublicacion(pub.id, pub.data)
            .success(function(returned){
                console.log("Returned is:");
                console.log(returned);
            })
            .error(function(returned){
                scope.guardar = "Error!"
                //TODO Hacer que espere un rato y vuelva a estar normal.
            })
    }

}]);
