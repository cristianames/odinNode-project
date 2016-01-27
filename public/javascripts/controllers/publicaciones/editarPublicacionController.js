app.controller("editarPublicacionController", ['$scope', '$location', 'PublicacionesFactory', '$routeParams', '$window','EtiquetasFactory' , function(scope, location, Publicaciones, routeParams, window, Etiquetas){

    var publicacion = {};
    scope.publicacionEtiquetas = [];
    scope.nombreBtn = "Actualizar";
    scope.tituloNavbar = "Editar publicacion";

    Publicaciones.getPublicacion(routeParams.id)
        .success(function (pub) {
            publicacion = pub;
            scope.publicacionCheckbox = publicacion.data.contributiva;
            scope.publicacionDesarrollo = publicacion.data.desarrollo;
            scope.publicacionDescripcion = publicacion.data.descripcion
            scope.publicacionTitulo = publicacion.data.titulo;
            scope.etiquetas = publicacion.data.etiquetas;

            Etiquetas.getEtiquetas()
                .success(function (response) {
                    scope.tags = response;
                    for (var i in response) {
                        if(pub.data.etiquetas[response[i].data.nombre] == true) {
                            scope.publicacionEtiquetas.push(response[i]);
                        }
                    }
                });
        });

    scope.onCancelar = function () {
        if (confirm('¿Esta seguro que cancelar los cambios? La publicación no se verá afectada.')) {
            window.history.back();
        };
    }

    scope.aniadirEtiqueta = function(){
        for (var i in scope.tags) {
            if(scope.tags[i].data.nombre == scope.etiquetaNombre) {
                if(scope.publicacionEtiquetas.indexOf(scope.tags[i])==-1){
                    scope.publicacionEtiquetas.push(scope.tags[i]);
                    scope.etiquetaNombre = null;
                    return;
                }
                else {
                    alert("La etiqueta ya esta agregada");
                    return;
                }
            }
        }
        alert("Inserte una etiqueta valida!");
    }

    scope.quitarEtiqueta = function(tag){
        var index = scope.publicacionEtiquetas.indexOf(tag);
        if(index != -1)scope.publicacionEtiquetas.splice(index, 1);
        else alert("No funciono el indexOf");
    }

    scope.onGuardar = function(){
        var etiquetas = new Object();
        for (var i in scope.publicacionEtiquetas){
            etiquetas[scope.publicacionEtiquetas[i].data.nombre] = true;
        }

        var pub = {
            'data': {
                'titulo':scope.publicacionTitulo,
                'descripcion':scope.publicacionDescripcion,
                'desarrollo':scope.publicacionDesarrollo,
                'contributiva':scope.publicacionCheckbox,
                'etiquetas':etiquetas
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
                //TODO(Lucas) Hacer que espere un rato y vuelva a estar normal.
            })
    }

}]);
