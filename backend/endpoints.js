var Etiqueta = require('./modelo/Etiqueta');

exports.inyectar = function(app) {

    app.get('/api/etiqueta', function(req, res) {
        res.json({items: [
            new Etiqueta('tag1'),
            new Etiqueta('tag2'),
            new Etiqueta('tag3'),
            new Etiqueta('tag4'),
            new Etiqueta('tag5'),
            new Etiqueta('tag6')
        ]});
    });

    app.get('/api/publicacion', function(req,res){
        res.json({items:[
            new Etiqueta('Publicacion tramposa 1'),
            new Etiqueta('Publicacion tramposa 2')
        ]});
    });

    //app.post('/api/publicacion',var publicacion,function(req,res){
    //
    //},var a);
