var Etiqueta = require('../modelo/Etiqueta');
var Firebase = require("firebase");
var publicaciones = new Firebase('https://odingrid.firebaseio.com/publicaciones');

exports.inyectar = function(app) {

    app.get('/api/publicacion', function (req, res) {
        publicaciones.once("value", function (data) {
            var lista = [];
            if(data.exists()){
                data.forEach(function(childSnapshot){
                    var childValue = childSnapshot.val();
                    childValue.id = childSnapshot.key();
                    lista.push(childValue);
                });
            }
            res.send(lista);
        });
    });

    app.post('/api/publicacion', function (req, res) {
        var obj = publicaciones.push().set(req.body);
        res.send("Exito!");
    });
}

//app.get('/api/publicacion', function (req, res) {
//    publicaciones.once("value", function (data) {
//        var lista = data.val();
//        res.send(lista);
//    });
//});