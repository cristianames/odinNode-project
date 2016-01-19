app.controller("publicacionController", ['$scope', '$location', 'PublicacionesFactory', '$routeParams', function(scope, location, Publicaciones, routeParams){

    var publicacion;

    Publicaciones.getPublicacion(routeParams.id)
        .success(function (pub) {
            publicacion = pub;
            console.log("aca se viene el html");
            console.log(publicacion);
            scope.publicacionCheckbox = publicacion.data.contributiva;
            scope.publicacionContenido = publicacion.data.desarrollo;
            scope.publicacionDescripcion = publicacion.data.descripcion;
            scope.publicacionTitulo = publicacion.data.titulo;

            scope.etiquetas = publicacion.data.etiquetas;
        });

    scope.onCancelar = function () {
        location.path("/");
    }
}]);
