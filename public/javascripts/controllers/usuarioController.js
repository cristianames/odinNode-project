var firebase = new Firebase("https://odingrid.firebaseio.com");

app.controller("usuarioController", ['$scope', '$location', 'UsuariosFactory', function(scope, location, Usuarios){

    scope.onCancelar = function () {
        location.path("/");
    }
    scope.onGuardar = function(){
               crearUsuario(usuario);
    }

    var guardar = function(usuario){
        var usuario = {
            'uid': scope.uid,
            'username':scope.formData.usuario,
            'password':scope.formData.usuarioContrasenia,
            'email':scope.formData.usuarioEmail,
            'nombre':scope.formData.usuarioNombre,
            'apellido':scope.formData.usuarioApellido,
        };
       Usuarios.insertUsuario(usuario)
            .success(function(returned){

            });
    }

    var crearUsuario = function(usuario) {
        alert("entre a crear usuario");
        firebase.createUser({
            email: scope.formData.usuarioEmail,
            password: scope.formData.usuarioContrasenia
        }, function (error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                scope.uid = userData.uid;
                guardar(usuario);
                scope.guardar = "Guardando.."
            }
        });
    }




}]);