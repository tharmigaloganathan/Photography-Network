var app = angular.module('myApp', []);
app.controller('lensController', function($scope, $http) {

    $http.get("http://localhost:3000/get-lenses")
    .then(function(response){
        $scope.lenses = response.data;

    });

});
