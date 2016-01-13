var Etiqueta = require('../modelo/Etiqueta');
var Firebase = require("firebase");
var etiquetas = new Firebase('https://odingrid.firebaseio.com/etiquetas');

exports.inyectar = function(app) {
    app.get('/api/etiqueta', function (req, res) {

        etiquetas.once("value", function(data) {
            var lista = data.val();
            res.send(lista);
        });
    });
}