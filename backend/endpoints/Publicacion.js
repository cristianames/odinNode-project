var Etiqueta = require('../modelo/Etiqueta');
var Firebase = require("firebase");
var publicaciones = new Firebase('https://odingrid.firebaseio.com/publicaciones');

exports.inyectar = function(app) {

    app.get('/api/publicacion', function (req, res) {
        res.json({
            items: [
                new Etiqueta('Publicacion tramposa 1'),
                new Etiqueta('Publicacion tramposa 2')
            ]
        });
    });

    app.post('/api/publicacion', function (req, res) {
        //console.log(req.body);
        var obj = publicaciones.push().set(req.body);
        res.send("Exito!");
    });

}