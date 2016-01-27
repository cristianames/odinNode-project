var Etiqueta = function(etiq){
    if (etiq == undefined) throw "excepción lo creo para el culo";
    if (etiq.nombre == undefined) throw "excepción titulo";
    if (etiq.descripcion == undefined) throw "excepción descripcion";
    if (etiq.padre == undefined) throw "excepción desarrollo";

    this.nombre = etiq.nombre;
    this.descripcion = etiq.descripcion;
    this.padre = etiq.padre;
}

exports.create = function(bodyReq) {
    return new Etiqueta(bodyReq);
};