var Etiqueta = require('../modelo/Etiqueta');
var Firebase = require("firebase");
var publicaciones = new Firebase('https://odingrid.firebaseio.com/publicaciones');

exports.inyectar = function(app) {

    app.get('/api/v1.0/publicacion', function (req, res) {
        //TODO Fijarte de trabajar con childAdded
        //https://www.firebase.com/docs/web/guide/structuring-data.html
        publicaciones.once("value", function (data) {
            var lista = [];
            if(data.exists()){
                data.forEach(function(childSnapshot){
                    var childValue = childSnapshot.val();
                    var returned = {data: 1,id:1};
                    returned.data = childValue;
                    returned.id = childSnapshot.key();
                    lista.push(returned);
                });
            }
            res.send(lista);
        });
    });

    app.post('/api/v1.0/publicacion', function (req, res) {
        var obj = publicaciones.push()
            obj.set(req.body);
        obj.once("value", function(obj) {
            var valor = data.val();
            console.log(valor);
            res.send(valor);
        });

        //res.send("Exito");

        //TODO Devolver el elemento recien insertado.
    });
}

//app.get('/api/publicacion', function (req, res) {
//    publicaciones.once("value", function (data) {
//        var lista = data.val();
//        res.send(lista);
//    });
//});