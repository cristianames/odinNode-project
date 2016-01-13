var Etiqueta = require('../modelo/Etiqueta');
var Firebase = require("firebase");
var etiquetas = new Firebase('https://odingrid.firebaseio.com/etiquetas');

exports.inyectar = function(app) {
    app.get('/api/etiqueta', function (req, res) {

        etiquetas.once("value", function(data) {
            var lista = data.val();
            res.send(lista);
        });

        //res.json({
        //    items: [
        //        new Etiqueta('tag1'),
        //        new Etiqueta('tag2'),
        //        new Etiqueta('tag3'),
        //        new Etiqueta('tag4'),
        //        new Etiqueta('tag5'),
        //        new Etiqueta('tag6')
        //    ]
        //});
    });
}