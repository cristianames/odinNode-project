app.controller("dashboardController", function($scope, $routeParams, $location, $http,
       EquiposFactory, UsuariosFactory, EtiquetasFactory){

    var pagination = [
        { name: 'inicio', url: 'views/equipos/dashboard/inicio.html'},
        { name: 'propuestas', url: 'views/equipos/dashboard/propuestas.html'},
        { name: 'integrantes', url: 'views/equipos/dashboard/integrantes.html'},
        { name: 'configuracion', url: 'views/equipos/dashboard/configuracion.html'},
        { name: 'nuevaPropuesta', url: 'views/equipos/dashboard/nuevaPropuesta.html'},
        { name: 'editarPropuesta', url: 'views/equipos/dashboard/editarPropuesta.html'}
    ];

    $scope.pagination = pagination[0];

    $scope.estaEnPagina = function(arrayIndices) {
        for (var i in arrayIndices) {
            if (pagination[arrayIndices[i]].name == $scope.pagination.name) return true;
        }
        return false;
    };

    //Esto sirve si se entra a una parte del dashboard directamente desde url
    for(var i in pagination) {
        if (pagination[i].name == $routeParams.page) $scope.pagination = pagination[i];
    }

    EquiposFactory.getEquipo($routeParams.id)
        .success(function(res) {
            $scope.equipo = res;
            console.log(res);
        })
        .error(function(res) {
            console.log(res);
            alert('Error al intentar obtener el equipo. ' + res);
        });

    UsuariosFactory.getUsuarios()
        .success(function(res) {
            $scope.usuarios = res;
            console.log(res);
        })
        .error(function (res) {
            console.log(res);
            alert('Error al intentar obtener los usuarios. ' + res);
        });

    var etiquetas;

    EtiquetasFactory.getEtiquetas().then(
        function(response) {
            //console.log(response.data);
            etiquetas = response.data.map(function(tag) {
                return {name: tag.data.nombre};
            });
        },function(res){
            etiquetas = [{name: 'Error al conectar con la base de datos'}];
    });

    //Dashboard menu

    $scope.onBtnPropuestas = function() {
        cambiarRutaDashboard(1);
        $scope.propuesta = {};
    };

    $scope.onBtnIntegrantes = function() {
        cambiarRutaDashboard(2);
    };

    $scope.onBtnConfiguracion = function() {
        cambiarRutaDashboard(3);
    };

    var cambiarRutaDashboard = function(i) {
        $scope.pagination = pagination[i];
        //Cambio la ruta de la url sin recargar la pagina.
        $location.path("/equipos/" + $routeParams.id + "/dashboard/" + pagination[i].name, false);
    }

    //Integrantes

    $scope.onBtnAgregarIntegrante = function() {
        //console.log($scope.usuarioSeleccionado);

        if (!$scope.usuarioSeleccionado) {
            return;
        }

        EquiposFactory.insertIntegrante($routeParams.id, $scope.usuarioSeleccionado)
            .success(function(res) {
                $scope.equipo.integrantes[res] = res;
            })
            .error(function (res) {
                console.log(res);
                alert('Error al intentar agregar un integrante. ' + res);
            });
    };

    $scope.quitarIntegrante = function (integrante) {
        EquiposFactory.quitarIntegrante($routeParams.id, integrante)
            .success(function(res) {
                delete $scope.equipo.integrantes[integrante];
            })
            .error(function(res) {
                console.log(res);
                alert('Error al intentar quitar un integrante. ' + res);
            });
    };

    //Propuestas


    $scope.onNuevaPropuesta = function() {
        cambiarRutaDashboard(4);
    };

    $scope.editarPropuesta = function (propuesta) {
        cambiarRutaDashboard(5);
        var tags = propuesta.etiquetas;
        var array = [];

        if (tags != undefined) {
            for (var i in tags) {
                array.push(i);
            }
        }

        $scope.propuesta = propuesta;
        $scope.propuesta.etiquetas = array;
    };

    $scope.onGuardarPropuesta = function() {
        //console.log($scope.propuesta);

        EquiposFactory.crearPropuesta($routeParams.id, $scope.propuesta)
            .success(function (res) {
                cambiarRutaDashboard(1);
                $scope.equipo.propuestas[res.id] = res;
                $scope.propuesta = {};
                //console.log(res);
            })
            .error(function(res) {
                console.log(res);
                alert('Error al intentar crear una propuesta. ' + res);
            });
    };

    $scope.onCancelarPropuesta = function() {
        cambiarRutaDashboard(1);
    };

    $scope.eliminarPropuesta = function (propuesta) {
        EquiposFactory.quitarPropuesta($routeParams.id, propuesta.id)
            .success(function (res) {
                delete $scope.equipo.propuestas[propuesta.id];
            })
            .error(function(res) {
                console.log(res);
                alert('Error al intentar eliminar una propuesta. ' + res);
            });
    };

    $scope.onEdicionTerminadaPropuesta = function () {
        EquiposFactory.editarPropuesta($routeParams.id, $scope.propuesta.id, $scope.propuesta)
            .success(function (res) {
                cambiarRutaDashboard(1);
                $scope.equipo.propuestas[res.id] = res;
            })
            .error(function(res) {
                console.log(res);
                alert('Error al intentar editar una propuesta. ' + res);
            });
    };

    $scope.getEtiquetas = function(query) {
        return etiquetas.filter(function (tag) {
            //console.log(tag.data.nombre);
            return tag.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
        })
    };
});