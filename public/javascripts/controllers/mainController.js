app.controller("mainController", ['$scope', 'PublicacionesFactory','EquiposFactory', '$rootScope', function($scope, Publicaciones,Equipos){
    $scope.pubs = {0: {data: {titulo: "Cargando..."}}};
    Publicaciones.getPublicaciones()
        .success(function (pubs) {
            $scope.pubs = pubs;
            console.log("Publicaciones-Index:")
            console.log(pubs);
        })

    $scope.crearEquipoMock = function(){
        var equipo = {
            'nombre':'equipoLoco',
            };
        Equipos.insertEquipo(equipo)
            .success(function(returned){
                alert("equipoCreado");
            });
    }

    Equipos.getEquipos()
        .success(function (res) {
            $scope.equipos = res;
            //console.log(res);
        });
}]);


