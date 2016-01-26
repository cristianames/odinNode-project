//El constructor debe contener las reglas de negocio
//Esta diseñado para estallar si se pasa la informacion en los nombres incorrectos

var Propuesta = function(titulo, cuerpo){
    if (titulo == undefined) throw "Titulo no especificado";
    if (cuerpo == undefined) throw "Cuerpo no especificado";

    this.titulo = titulo;
    this.cuerpo = cuerpo;
}

exports.create = function(bodyReq) {
    return new Propuesta(bodyReq.titulo, bodyReq.cuerpo);
};
