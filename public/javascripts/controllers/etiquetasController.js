//SI DESGLOSAN ESTE ARCHIVO EN VARIOS JS, PRIMERO CREEN UNA CARPETA QUE LOS CONTENGA A TODOS
app.controller('etiquetasController', ['$scope', 'EtiquetasFactory', '$window', function(scope, EtiquetaFactory, window) {

    EtiquetaFactory.getEtiquetas()
        .success(function (etiqs) {
            scope.tags = etiqs;
        })


    scope.onVolver = function(){
        window.history.back();
    }
}]);
