app.controller("nuevaPublicacionController", ['$scope', '$location', 'PublicacionesFactory', 'EtiquetasFactory'
    , function(scope, location, Publicaciones, Etiquetas){

        scope.publicacionCheckbox = true;  //Si no se pone en true entonces arranca undefined.
        scope.nombreBtn = "Guardar";
        scope.tituloNavbar = "Nueva publicacion";
        scope.publicacionEtiquetas = [];

        Etiquetas.getEtiquetas()
            .success(function(response){
                scope.tags = response;
            });

        scope.onCancelar = function () {
            location.path("/");
        }
        scope.onGuardar = function(){
            var etiquetas = new Object();
            for (var i in scope.publicacionEtiquetas){
                etiquetas[scope.publicacionEtiquetas[i].data.nombre] = true;
            }
            var publicacion = {
                'titulo':scope.publicacionTitulo,
                'descripcion':scope.publicacionDescripcion,
                'desarrollo':scope.publicacionDesarrollo,
                'contributiva':scope.publicacionCheckbox,
                'etiquetas': etiquetas
            };
            guardar(publicacion);
            scope.nombreBtn = "Guardando.."
        }
        scope.onDescripcion = function(){
            if(!scope.publicacionDescripcion.localeCompare("Inserte breve descripción.")) scope.publicacionDescripcion = null;
        }
        scope.onContenido = function(){
            if(!scope.publicacionDesarrollo.localeCompare("Inserte contenido.")) scope.publicacionDesarrollo = null;
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


        var guardar = function(pub){
            Publicaciones.insertPublicacion(pub)
                .success(function(returned){
                    //console.log("Returned is:", returned);
                    location.path("/");
                })
                .error(function(returned){
                    scope.guardar = "Error!"
                    //TODO(Cristian) Hacer que espere un rato y vuelva a estar normal.
                })
        }

}]);
