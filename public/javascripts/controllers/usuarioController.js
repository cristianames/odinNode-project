var firebase = new Firebase("https://odingrid.firebaseio.com");
var fError;
var fAuthData;

app.controller("usuarioController", ['$scope', '$location', 'UsuariosFactory', function(scope, location, Usuarios){

    scope.errorPass=false;

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

    scope.loguinUsuario = function (){
        console.log("antes de firebase",scope.logUsername);

        firebase.authWithPassword({
            email    : scope.logUsername,
            password : scope.logPassword
        }, function(error, authData) {
            if (error) {
                //funcionLoca();
                fError = error;
                scope.errorPass=true;
                console.log(scope.errorPass);
                console.log("Login Failed!", error);
            } else {
                scope.authData = authData;
                console.log("Authenticated successfully with payload:", authData);
            }
        },
            {
            remember: "sessionOnly"
        });

        console.log("ahi un:", fError);
        if (fError) {
             console.log("Login Fallò!", fError);
             funcionLoca(true);
        }


    }

    scope.probar = function (){
        scope.errorPass=true;
    }

    var funcionLoca = function (){
        scope.errorPass=true;
    }





}]);


