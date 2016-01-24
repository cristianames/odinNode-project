var Usuario = function(user){
    if (user == undefined) throw "excepción lo creo para el culo";
    if (user.username == undefined) throw "excepción username";
    if (user.password == undefined) throw "excepción password";
    if (user.nombre == undefined) throw "excepción nombre";
    if (user.apellido == undefined) throw "excepción apellido";
    if (user.uid == undefined) throw "excepción apellido";
    if (user.email == undefined) throw "excepción apellido";

    this.username = user.username;
    this.password = user.password;
    this.nombre = user.nombre;
    this.apellido = user.apellido;
    this.uid = user.uid;
    this.email = user.email;
}

exports.create = function(bodyReq) {
    return new Usuario(bodyReq);
};