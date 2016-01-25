app.controller("dashboardController", function($scope, EquiposFactory, UsuariosFactory, $routeParams){

    var pagination = [
        { name: 'inicio', url: 'views/equipos/dashboard/inicio.html'},
        { name: 'propuestas', url: 'views/equipos/dashboard/propuestas.html'},
        { name: 'integrantes', url: 'views/equipos/dashboard/integrantes.html'},
        { name: 'configuracion', url: 'views/equipos/dashboard/configuracion.html'}
    ];

    $scope.pagination = pagination[0];

    EquiposFactory.getEquipo($routeParams.id, function(res) {
        $scope.equipo = res.data;
        //console.log(res.data);
    });

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
                $scope.equipo.integrantes.push(res.data);
                //console.log(res.data);
            }, function (res) {
                alert(res.data);
                //console.log(res);
            });
    };

    $scope.quitarIntegrante = function (integrante) {
        EquiposFactory.quitarIntegrante($routeParams.id, integrante,
            function(res) {
                var index = $scope.equipo.integrantes.indexOf(integrante);
                $scope.equipo.integrantes.splice(index, 1);
            }, function(res) {
                alert(res.data);
            })
    };
});