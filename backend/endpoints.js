var etiquetas = require('./endpoints/Etiqueta');
var publicacion = require('./endpoints/Publicacion');

exports.inyectar = function(app, Firebase) {

    //Agregar los proximos endpoints en la carpeta endpoints siguiendo el esquema de los otros.

    etiquetas.inyectar(app, Firebase);
    publicacion.inyectar(app, Firebase);
}
