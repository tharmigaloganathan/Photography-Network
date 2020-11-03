var app = angular.module('myApp', []);
app.controller('imageController', function($scope, $http) {

    $scope.LensID = "";
    $scope.EventID = "";
    $scope.CameraID="";
    $scope.ImageURL="";



    $scope.uploadImage = function (){
        var query = "http://localhost:3000/add-image/"+$scope.LensID+"/"+$scope.EventID+"/"+$scope.CameraID+"/"+$scope.ImageURL;
        console.log(query);
        $http.get(query)
        .then(function(response){
            console.log(response.data);

        });
    }

});
