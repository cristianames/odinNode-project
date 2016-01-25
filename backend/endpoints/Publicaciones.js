var Etiqueta = require('../modelo/Etiqueta');
var Publicacion = require('../modelo/Publicacion');
var Firebase = require("firebase");
var publicaciones = new Firebase('https://odingrid.firebaseio.com/publicaciones');

exports.inyectar = function(app) {
    app.get('/api/v1.0/publicacion', function (req, res) {
        var lista = [];
        var itemLista;
        publicaciones.once("value", function (snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot){
                    var titulo = childSnapshot.child("titulo");
                    var descripcion = childSnapshot.child("descripcion");
                    itemLista = {data: {titulo: titulo.val(), descripcion: descripcion.val()}, id: childSnapshot.key()};
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

    app.post('/api/publicacion', function (req, res) {
        var pusheable = publicaciones.push()
        pusheable.set(req.body);
        publicaciones.once("value", function(snap) {
            res.send(snap.val());
        });
    });

    app.get('/api/v1.0/publicacion/:id', function (req, res) {
        publicaciones.child(req.params.id).once("value", function(snapshot) {
            res.send(empaquetar(snapshot));
        });
    });

    app.put('/api/v1.0/publicacion/:id', function (req, res) {
        var pub = Publicacion.create(req.body);
        publicaciones.child(req.params.id).update(pub);
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
