//SI DESGLOSAN ESTE ARCHIVO EN VARIOS JS, PRIMERO CREEN UNA CARPETA QUE LOS CONTENGA A TODOS
app.controller('etiquetasController', ['$scope', 'EtiquetasFactory', '$window', '$timeout', 'Utils',
    function($scope, Etiquetas, window, $timeout, Utils) {
        var tree;
        $scope.my_data = [];
        $scope.my_tree = tree = {};
        $scope.doing_async = $scope.isDisabledPeligro = $scope.isDisabledSuccess = true;
        $scope.btnPeligro = "Editar";
        $scope.btnSuccess = "Nueva";
        $scope.botonPeligro = $scope.botonSuccess = {};

        Etiquetas.getEtiquetas()
            .success(function (etiqs) {
                $scope.tags = etiqs;
                cargarArbol();
                $scope.doing_async = false;
                cargarEstadoLectura();
            })

        $scope.onVolver = function(){
            window.history.back();
        }

        $scope.my_tree_handler = function(branch) {
            $scope.output = branch;
            $scope.isDisabledPeligro = $scope.isDisabledSuccess = false;
        };

        var cargarArbol = function(){
            var nivel0 = Utils.findByCondition($scope.tags, function(etiqueta){
                return etiqueta.data.padre ? false : true;
            });
            Utils.forEach(nivel0, function(hijo){
                branchearConHijos(hijo);
            })
        };

        var branchearConHijos = function(etiqueta, padre){
            var branch = tree.add_branch(padre, {
                label: etiqueta.data.nombre,
                children: [],
                data:
                {
                    descripcion: etiqueta.data.descripcion ? etiqueta.data.descripcion : "Descripcion de prueba"
                }
            });
            var hijos = Utils.findByCondition($scope.tags, function(etiquetaHijo){
                return etiquetaHijo.data.padre ==  etiqueta.data.nombre;
            });
            if(hijos != null){
                Utils.forEach(hijos, function(hijo){
                    branchearConHijos(hijo, branch);
                })
            }
        };

        var cargarAsincronicamente = function() {
            $scope.my_data = [];
            $scope.output = {};
            $scope.doing_async = true;
            $scope.doing_async = $scope.isDisabledPeligro = $scope.isDisabledSuccess = true;
            return $timeout(function() {
                cargarArbol();
                $scope.doing_async = false;
                return tree.expand_all();
            }, 1000);
        };

        var cargarEstadoNueva = function(){
            $scope.formularioEtiqueta = 'C';
            $scope.btnPeligro = "Cancelar";
            $scope.btnSuccess = "Guardar";
            //$scope.isDisabledPeligro = $scope.isDisabledSuccess = false;
            $scope.botonPeligro = function(){
                cargarEstadoLectura();
            }
            $scope.botonSuccess = function(){
                var etiqueta = {
                    nombre:$scope.titulo,
                    descripcion:$scope.descripcion,
                    padre: $scope.output ?  $scope.output.label : null
                };
                Etiquetas.insertEtiqueta(etiqueta)
                    .success(function(returned){
                        $scope.tags.push(returned);
                        cargarAsincronicamente();
                        cargarEstadoLectura();
                    });
            }
        }

        var cargarEstadoLectura = function(){
            $scope.formularioEtiqueta = null;
            $scope.btnPeligro = "Editar";
            $scope.btnSuccess = "Nueva";
            $scope.titulo = $scope.descripcion = null;
            //$scope.isDisabledPeligro = $scope.isDisabledSuccess = false;
            $scope.botonPeligro = function(){
                cargarEstadoEdicion();
            }
            $scope.botonSuccess = function(){
                cargarEstadoNueva();
            }
        }

        var cargarEstadoEdicion = function(){
            $scope.formularioEtiqueta = 'U';
            $scope.btnPeligro = "Borrar";
            $scope.btnSuccess = "Guardar";
            $scope.titulo = $scope.output.label;
            $scope.descripcion = $scope.output.data.descripcion;
            //$scope.isDisabledPeligro = $scope.isDisabledSuccess = false;
            var lista = Utils.findByCondition($scope.tags,function(etiqueta){
                return etiqueta.data.nombre == $scope.output.label;
            })
            $scope.botonPeligro = function(){
                if (lista.length == 1) {
                    Etiquetas.deleteEtiqueta(lista[0].id)
                        .success(function(res){
                            var index = $scope.tags.indexOf(lista[0]);
                            if(index != -1)$scope.tags.splice(index, 1);
                            cargarAsincronicamente();
                        });
                }
                cargarEstadoLectura();
            }
            $scope.botonSuccess = function(){
                if (lista.length == 1) {
                    lista[0].data.nombre = $scope.titulo;
                    lista[0].data.descripcion = $scope.descripcion;
                    Etiquetas.updateEtiqueta(lista[0].id,lista[0].data)
                        .success(function(res){
                            cargarAsincronicamente();
                        });
                }
                cargarEstadoLectura();
            }
        }
}]);
