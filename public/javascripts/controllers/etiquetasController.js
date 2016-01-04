app.controller('etiquetasController', function($scope, Etiqueta, Publicacion) {
   Etiqueta.query(function(data){
      $scope.tags = data.items;
      console.log(data);
   });
   Publicacion.query(function(data) {
       $scope.pubs = data.items;
   });
});