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

    app.get('/api/v1.0/publicacion/:id', function (req, res) {
        publicaciones.child(req.params.id).once("value", function(snapshot) {
            res.send(empaquetar(snapshot));
        });
    });

    app.post('/api/v1.0/publicacion', function (req, res) {
        var pusheable = publicaciones.push()
        //console.log(req.body);
        var pub = Publicacion.create(req.body);
        pusheable.set(pub);
        pusheable.once("value", function(snapshot) {
            res.send(empaquetar(snapshot));
        });
    });

    app.put('/api/v1.0/publicacion/:id', function (req, res) {
        var pub = Publicacion.create(req.body);
        publicaciones.child(req.params.id).update(pub);
    });

    app.delete('/api/v1.0/publicacion/:id', function (req, res) {

        var onComplete = function(error) {
            if (error) {
                console.log('Error al borrar publicación.');
            } else {
                console.log('Publicacion borrada.');
            }
        };
        publicaciones.child(req.params.id).remove(onComplete);
    });

}

var empaquetar = function(snapshot){
    var returned = {data: 1,id:1};
    returned.data = snapshot.val();
    returned.id = snapshot.key();
    return returned;
}
