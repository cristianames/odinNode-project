var Usuario = require('../modelo/Usuario');
var Firebase = require("firebase");
var usuarios = new Firebase('https://odingrid.firebaseio.com/usuarios');

exports.inyectar = function(app) {

      app.get('/api/v1.0/usuario', function (req, res) {
        var lista = [];
        var itemLista;
        usuarios.once("value", function (snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot){
                    itemLista = {
                        data: {
                            nombreUsuario: childSnapshot.val().nombreUsuario,
                        },
                        username: childSnapshot.val().nombreUsuario,
                        id: childSnapshot.key()
                    };
                    lista.push(itemLista);
                });
            }
            res.send(lista);
        });
      });

    //var crearUsuario = function(user){
    //    console.log("entre a crear usuario");
    //    alert(user.contrasenia);
    //
    //}

    app.post('/api/v1.0/usuario', function (req, res) {
        try {
            //alert("entre al endpoint");
            console.log(req.body);
            var user = Usuario.create(req.body);
            var obj = usuarios.push().set(user);  //Estoy pusheando un usuario en firebase con id autogenerado en lista de equipo
            res.send("Exito!");
            //alert("se creo usuario");
        } catch (err) {
            console.log(err);
        }
    });



}