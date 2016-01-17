app.controller("usuarioController", ['$scope', '$location', 'UsuariosFactory', function(scope, location, Usuarios){

    scope.onCancelar = function () {
        location.path("/");
    }
    scope.onGuardar = function(){
        var usuario = {
            'nombreUsuario':scope.formData.usuario,
            'contraseña':scope.formData.usuarioContrasenia,
            'nombre':scope.formData.usuarioNombre,
            'apellido':scope.formData.usuarioApellido,
            };

        guardar(usuario);
        scope.guardar = "Guardando.."
    }

    var guardar = function(usuario){
        Usuarios.insertUsuario(usuario)
            .success(function(returned){
                location.path("/");
            });
    }

}]);