var app = angular.module('myApp', []);
app.controller('cameraController', function($scope, $http) {

    $http.get("http://localhost:3000/get-cameras")
    .then(function(response){
        $scope.cameras = response.data;

    });

});
