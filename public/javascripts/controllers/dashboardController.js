app.controller("dashboardController", function($scope, EquiposFactory, UsuariosFactory, $routeParams){

    EquiposFactory.getEquipo($routeParams.id, function(res) {
        $scope.equipo = res.data;

        if ($scope.equipo.integrantes == undefined) {
            $scope.equipo.integrantes = [];
        }

        //console.log(res.data);
    });

    //EquiposFactory.getEquipos(function (res) {
    //    console.log(res.data);
    //
    //    for (var i in res.data) {
    //        console.log(i);
    //        console.log(res.data[i]);
    //    }
    //})

    var pagination = [
        { name: 'inicio', url: 'views/equipos/dashboard/inicio.html'},
        { name: 'propuestas', url: 'views/equipos/dashboard/propuestas.html'},
        { name: 'integrantes', url: 'views/equipos/dashboard/integrantes.html'},
        { name: 'configuracion', url: 'views/equipos/dashboard/configuracion.html'}
    ];

    $scope.pagination = pagination[0];

    $scope.onBtnPropuestas = function() {
        $scope.pagination = pagination[1];
    };

    $scope.onBtnIntegrantes = function() {
        $scope.pagination = pagination[2];
        UsuariosFactory.getUsuarios(function(res) {
            $scope.usuarios = res.data;
            //console.log(res.data);
        });
    };

    $scope.onBtnConfiguracion = function() {
        $scope.pagination = pagination[3];
    };

    $scope.onBtnAgregarIntegrante = function() {
        //console.log($scope.usuarioSeleccionado);
        EquiposFactory.insertIntegrante($routeParams.id, $scope.usuarioSeleccionado,
            function(res) {
                //console.log(res.data);
                $scope.equipo.integrantes.push(res.data);
            }, function (res) {
                alert(res.data);
                //console.log(res);
            });
    };

    $scope.quitarIntegrante = function (integrante) {
        EquiposFactory.quitarIntegrante($routeParams.id, integrante.username,
            function(res) {
                $scope.equipo.integrantes = res.data;
            }, function(res) {
                alert(res.data);
            })
    };
});