app.controller("mainController", ['$scope', 'PublicacionesFactory','EquiposFactory', function($scope, Publicaciones,Equipos){
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
    
    Equipos.getEquipo()
        .success(function (equipos) {
                $scope.equipos = equipos;
            //console.log("Publicaciones-Index:")
            //console.log(pubs);

        })


}]);


