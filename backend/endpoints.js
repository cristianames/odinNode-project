var Etiqueta = require('./modelo/Etiqueta');

exports.inyectar = function(app) {

    app.get('/_ah/api/etiqueta', function(req, res) {
        res.json({items: [
            new Etiqueta('tag1'),
            new Etiqueta('tag2'),
            new Etiqueta('tag3'),
            new Etiqueta('tag4'),
            new Etiqueta('tag5'),
            new Etiqueta('tag6')
        ]});
    });

}