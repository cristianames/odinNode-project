var firebase = new Firebase("https://odingrid.firebaseio.com");

app.controller("usuarioController", ['$scope','md5', '$location', 'UsuariosFactory','$rootScope', function(scope,md5, location,Usuarios,$rootScope){

    scope.errorPass=false;
    //scope.errorFirebase= "me mostre";

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
                scope.$apply(function() {mostrarError(error);
                scope.errorPass=true;});
                console.log(scope.errorPass);
                console.log("Login Failed!", error);
            } else {
                scope.$apply(function() {
                    $rootScope._userData=authData;
                });
                console.log("Authenticated successfully with payload:", $rootScope._userData);
            }
        },
            {
            remember: "sessionOnly"
        });

    }

    scope.loguearConFacebook = function (){

        firebase.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                scope.$apply(function() {
                    $rootScope._userData=authData;
                    $rootScope.logueado = true;
                });
                console.log("Authenticated successfully with payload:", authData);
            }
        },
            {
            remember: "sessionOnly",
            scope: "email,user_likes"
        });
    }



    scope.probar = function (){
        console.log($rootScope._color);
        console.log($rootScope._userData.facebook.profileImageURL);
    }



    var mostrarError = function (error){
        scope.errorPass=true;
        if (error) {
            switch (error.code) {
                case "INVALID_EMAIL":
                    scope.errorFirebase= "The specified user account email is invalid.";
                    break;
                case "INVALID_PASSWORD":
                    scope.errorFirebase="The specified user account password is incorrect.";
                    break;
                case "INVALID_USER":
                    scope.errorFirebase="The specified user account does not exist.";
                    break;
                default:
                    scope.errorFirebase="Error logging user in:"+ error;
            }
        }

    }





}]);


