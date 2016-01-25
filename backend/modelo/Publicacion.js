var Publicacion = function(pub){
    if (pub == undefined) throw "excepción lo creo para el culo";
    if (pub.titulo == undefined) throw "excepción titulo";
    if (pub.descripcion == undefined) throw "excepción descripcion";
    if (pub.desarrollo == undefined) throw "excepción desarrollo";
    if (pub.contributiva == undefined) throw "excepción contributiva";
    if (pub.etiquetas == undefined) throw "excepción etiquetas";

    this.titulo = pub.titulo;
    this.descripcion = pub.descripcion;
    this.desarrollo = pub.desarrollo;
    this.contributiva = pub.contributiva;
    this.etiquetas = pub.etiquetas;
}

exports.create = function(bodyReq) {
    return new Publicacion(bodyReq);
};