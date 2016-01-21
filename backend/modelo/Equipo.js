//El constructor debe contener las reglas de negocio
//Esta diseñado para estallar si se pasa la informacion en los nombres incorrectos

var Equipo = function(nombre){
    if (nombre == undefined) throw "Nombre no especificado";

    this.nombre = nombre;
    this.integrantes = [];
}

exports.create = function(bodyReq) {
    return new Equipo(bodyReq.nombreEquipo);
};