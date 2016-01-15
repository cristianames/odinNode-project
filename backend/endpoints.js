var etiquetas = require('./endpoints/Etiquetas');
var publicaciones = require('./endpoints/Publicaciones');
var equipos = require('./endpoints/Equipos');

exports.inyectar = function(app) {

    //Agregar los proximos endpoints en la carpeta endpoints siguiendo el esquema de los otros.

    etiquetas.inyectar(app);
    publicaciones.inyectar(app);
    equipos.inyectar(app);

}
