var Integrante = function(username){
    if (username == undefined) throw "Nombre no especificado";

    this.username = username;
}

exports.create = function(bodyReq) {
    return new Integrante(bodyReq.username);
};
