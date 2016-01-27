app.controller("nuevaPublicacionController", ['$scope', '$location', 'PublicacionesFactory','EtiquetasFactory', '$rootScope', function(scope, location, Publicaciones,Etiquetas, $rootScope){
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
            'desarrollo':scope.publicacionContenido,
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
        if(!scope.publicacionContenido.localeCompare("Inserte contenido.")) scope.publicacionContenido = null;
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
