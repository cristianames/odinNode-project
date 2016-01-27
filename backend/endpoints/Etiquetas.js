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
                    var descripcion = childSnapshot.child("descripcion");
                    var padre = childSnapshot.child("padre");
                    itemLista =
                    {
                        data:
                        {
                            nombre: nombre.val(),
                            descripcion: descripcion.val(),
                            padre: padre.val()
                        },
                        id: childSnapshot.key()
                    };
                    lista.push(itemLista);
                });
            }
            res.send(lista);
        });
    });
    app.post('/api/v1.0/etiqueta', function (req, res) {
        var pusheable = etiquetas.push()
        var etiq = Etiqueta.create(req.body);
        pusheable.set(etiq);
        pusheable.once("value", function(snapshot) {
            res.send(empaquetar(snapshot));
        });
    });

    app.put('/api/v1.0/etiqueta/:id', function (req, res) {
        var etiq = Etiqueta.create(req.body);
        etiquetas.child(req.params.id).update(etiq);
        res.send("Todo OK");
    });

    app.delete('/api/v1.0/etiqueta/:id', function (req, res) {
        var onComplete = function(error) {
            if (error) {
                console.log('Error al borrar etiqueta.');
            } else {
                console.log('Etiqueta borrada.');
            }
        };
        etiquetas.child(req.params.id).remove(onComplete);
        res.send("Todo OK");
    });
};

var empaquetar = function(snapshot){
    var returned = {data: 1,id:1};
    returned.data = snapshot.val();
    returned.id = snapshot.key();
    return returned;
}