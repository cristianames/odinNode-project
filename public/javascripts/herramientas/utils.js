app.factory('Utils', [function() {
    var Factory = {};
    Factory.forEach = function(lista, funcion) {
        for (var i in lista) {
            funcion(lista[i]);
        }
    }
    Factory.findByCondition = function(lista, condicion) {
        var listaReturn = [];
        for ( var i in lista) {
            if ( condicion(lista[i]) ) {
                listaReturn.push(lista[i]);
            }
        }
        return listaReturn;
    }
    return Factory;
}]);