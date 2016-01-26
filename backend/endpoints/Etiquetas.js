var Etiqueta = require('../modelo/Etiqueta');
var Firebase = require("firebase");
var etiquetas = new Firebase('https://odingrid.firebaseio.com/etiquetas');

exports.inyectar = function(app) {
    app.get('/api/v1.0/etiqueta', function (req, res) {
        var lista = [];
        var itemLista;
        etiquetas.once("value", function (snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot){
                    var nombre = childSnapshot.child("nombre");
                    itemLista = {data: {nombre: nombre.val()}, id: childSnapshot.key()};
                    lista.push(itemLista);
                });
            }
            res.send(lista);
        });
    });
};