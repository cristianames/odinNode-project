app.controller("publicacionController", ['$scope', '$location', 'PublicacionesFactory', '$routeParams', function(scope, location, Publicaciones, routeParams){

    var publicacion = {};

    Publicaciones.getPublicacion(routeParams.id)
        .success(function (pub) {
            publicacion = pub;
            scope.publicacionCheckbox = publicacion.data.contributiva;
            scope.publicacionDesarrollo = publicacion.data.desarrollo;
            if(!publicacion.data.descripcion)                               //TODO(Deprecated)
                scope.publicacionDescripcion = publicacion.data.contenido;  //Deprecated
            else                                                            //Deprecated
                scope.publicacionDescripcion = publicacion.data.descripcion
            scope.publicacionTitulo = publicacion.data.titulo;

            scope.etiquetas = publicacion.data.etiquetas;
        });

    scope.onCancelar = function () {
        location.path("/");
    }

    scope.onEditar = function () {
        location.path("/publicaciones/" + publicacion.id + "/editar");
    }
}]);
