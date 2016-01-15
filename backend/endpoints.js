var etiquetas = require('./endpoints/Etiquetas');
var publicaciones = require('./endpoints/Publicaciones');
var equipos = require('./endpoints/Equipos');
var usuarios = require('./endpoints/Usuarios');

exports.inyectar = function(app) {

    //Agregar los proximos endpoints en la carpeta endpoints siguiendo el esquema de los otros.

    etiquetas.inyectar(app);
    publicaciones.inyectar(app);
    equipos.inyectar(app);
    usuarios.inyectar(app);


}
