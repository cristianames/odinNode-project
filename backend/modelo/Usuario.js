var Usuario = function(username){
    if (username == undefined) throw "Nombre no especificado";

    this.username = username;
    //this.usuario = user.usuario;
    //this.nombre = user.nombre;
    //this.apellido = user.apellido;
}

exports.create = function(bodyReq) {
    return new Usuario(bodyReq.username);
};