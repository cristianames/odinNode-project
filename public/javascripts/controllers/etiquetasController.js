app.controller('etiquetasController', function($scope, Etiqueta) {
   Etiqueta.query(function(data){
      $scope.tags = data.items;
      console.log(data);
   });
});