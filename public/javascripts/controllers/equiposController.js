//SI DESGLOSAN ESTE ARCHIVO EN VARIOS JS, PRIMERO CREEN UNA CARPETA QUE LOS CONTENGA A TODOS
app.controller("equiposController", ['$scope', '$location', 'EquiposFactory', function(scope, location, Equipos){

    scope.onCancelar = function () {
        location.path("/");
    }
    scope.onGuardar = function(){
        var equipo = {
            'nombreEquipo':scope.equipoNombre,
        };
        guardar(equipo);
        scope.guardar = "Guardando.."
    }

    var guardar = function(equipo){
        Equipos.insertEquipo(equipo)
            .success(function(returned){
                location.path("/");
            });
    }

}]);