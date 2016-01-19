var Etiqueta = require('../modelo/Etiqueta');
var Firebase = require("firebase");
var publicaciones = new Firebase('https://odingrid.firebaseio.com/publicaciones');

exports.inyectar = function(app) {
    app.get('/api/v1.0/publicacion', function (req, res) {
        var lista = [];
        var itemLista;
        publicaciones.once("value", function (snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot){
                    itemLista = {data: {titulo: childSnapshot.val().titulo}, id: childSnapshot.key()};
                    lista.push(itemLista);
                });
            }
            res.send(lista);
        });
    });

    app.post('/api/v1.0/publicacion', function (req, res) {
        var pusheable = publicaciones.push()
        pusheable.set(req.body);
        pusheable.once("value", function(snapshot) {
            res.send(empaquetar(snapshot));
        });
    });

    app.get('/api/v1.0/publicacion/:id', function (req, res) {
        publicaciones.child(req.params.id).once("value", function(snapshot) {
            res.send(empaquetar(snapshot));
        });
    });
}

var empaquetar = function(snapshot){
    var returned = {data: 1,id:1};
    console.log("Antes del val");
    returned.data = snapshot.val();
    console.log("Despues del val");
    returned.id = snapshot.key();
    return returned;
}
