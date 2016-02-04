app.controller("mainController", ['$scope', 'PublicacionesFactory','EquiposFactory','$rootScope', function($scope, Publicaciones,Equipos,$rootScope){
    $scope.pubs = {0: {data: {titulo: "Cargando..."}}};

    //$scope._user = $rootScope._userData;
   /* $scope.logueado = $rootScope._userData;*/   //TODO Hacer mejor esta parte

    Publicaciones.getPublicaciones()
        .success(function (pubs) {
            $scope.pubs = pubs;
            console.log("Publicaciones-Index:")
            console.log(pubs);
        })


    $scope.crearEquipoMock = function(){
        //console.log($scope._user.facebook.profileImageURL);
        console.log($rootScope._userData.facebook.profileImageURL);

    }

    Equipos.getEquipos(function (res) {
        $scope.equipos = [];
        for (var i in res.data) {
            $scope.equipos.push({
                nombre: res.data[i].nombreEquipo,
                id: i
            });
        }
    })
    
    //Equipos.getEquipo()
    //    .success(function (equipos) {
    //            $scope.equipos = equipos;
    //        //console.log("Publicaciones-Index:")
    //        //console.log(pubs);
    //
    //    })


}]);


