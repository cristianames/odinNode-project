app.controller("publicacionController", ['$scope', '$location', 'PublicacionesFactory', '$routeParams', 'EtiquetasFactory','$window', function(scope, location, Publicaciones, routeParams, Etiquetas, window){

    var publicacion = {};
    scope.publicacionEtiquetas = [];

    Publicaciones.getPublicacion(routeParams.id)
        .success(function (pub) {
            publicacion = pub;
            scope.publicacionCheckbox = pub.data.contributiva;
            scope.publicacionDesarrollo = pub.data.desarrollo;
            scope.publicacionDescripcion = pub.data.descripcion
            scope.publicacionTitulo = pub.data.titulo;

            Etiquetas.getEtiquetas().success(function (etiqs) {
                for (var i in etiqs) {
                    if(pub.data.etiquetas[etiqs[i].data.nombre] == true) {
                            scope.publicacionEtiquetas.push(etiqs[i]);
                        }
                    }
            });
        });

    scope.onCancelar = function () {
        window.history.back();
    }

    scope.onEditar = function () {
        location.path("/publicaciones/" + publicacion.id + "/editar");
    }

    scope.onEliminar = function () {
        if (confirm('¿Esta seguro que desea eliminar la publicación? Este cambio no es reversible.')) {
            Publicaciones.deletePublicacion(publicacion.id);
            alert('La publicación ha sido eliminada.');
            location.path("/");
            };
    }

}]);
