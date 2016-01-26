app.controller("publicacionController", ['$scope', '$location', 'PublicacionesFactory', '$routeParams', function(scope, location, Publicaciones, routeParams){

    var publicacion = {};

    Publicaciones.getPublicacion(routeParams.id)
        .success(function (pub) {
            publicacion = pub;
            scope.publicacionCheckbox = publicacion.data.contributiva;
            scope.publicacionDesarrollo = publicacion.data.desarrollo;
            scope.publicacionDescripcion = publicacion.data.descripcion
            scope.publicacionTitulo = publicacion.data.titulo;

            scope.etiquetas = publicacion.data.etiquetas;   //TODO(Lucas) Deprecado! Actualizar atributos.
        });

    scope.onCancelar = function () {
        location.path("/");
    }

    scope.onEditar = function () {
        location.path("/publicaciones/" + publicacion.id + "/editar");
    }
}]);
