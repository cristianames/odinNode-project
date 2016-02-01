//El constructor debe contener las reglas de negocio
//Esta diseñado para estallar si se pasa la informacion en los nombres incorrectos

var Propuesta = function(titulo, cuerpo, etiquetas){
    if (titulo == undefined) throw "Titulo no especificado";
    if (cuerpo == undefined) throw "Cuerpo no especificado";

    this.titulo = titulo;
    this.cuerpo = cuerpo;

    if (etiquetas != undefined) {
        console.log(etiquetas);
        this.etiquetas = {};
        for(var i in etiquetas) {
            if (etiquetas[i].name != '')
                this.etiquetas[etiquetas[i].name] = true;
        }
    }
}

exports.create = function(bodyReq) {
    return new Propuesta(bodyReq.titulo, bodyReq.cuerpo, bodyReq.etiquetas);
};
