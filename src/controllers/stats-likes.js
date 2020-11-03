var app = angular.module('myApp', []);
app.controller('StatLikeController', function($scope, $http) {

    $scope.cameraID = "";
    $scope.getData = function (){
        $http.get("http://localhost:3000/stats-likes/"+$scope.cameraID)
        .then(function(response){
            $scope.rows = response.data;
            console.log(response.data);
        });
    }

});
