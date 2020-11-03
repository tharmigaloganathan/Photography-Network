var app = angular.module('myApp', []);
app.controller('photosController', function($scope, $http) {

    $http.get("http://localhost:3000/your-photos")
    .then(function(response){
        $scope.photos = response.data;

        for(var i = 0; i<$scope.photos.length;i++) {
            $scope.photos[i].date = new Date($scope.photos[i].date);
            $scope.photos[i].date = $scope.photos[i].date.toDateString();
            if($scope.photos[i].pictureURL) {
                $scope.photos[i].image = "https://goo.gl/" + $scope.photos[i].pictureURL;
                continue;
            } else if($scope.photos[i].occasionName == "Family Photoshoot") {
                $scope.photos[i].image = "../family.jpg";
            } else if($scope.photos[i].occasionName == "Anniversary") {
                $scope.photos[i].image = "../anniversary.jpg";
            } else if($scope.photos[i].occasionName == "Wedding") {
                $scope.photos[i].image = "../wedding.jpg";
            } else if($scope.photos[i].occasionName == "Birthday") {
                $scope.photos[i].image = "../birthday.jpg";
            } else if($scope.photos[i].occasionName == "Office Party") {
                $scope.photos[i].image = "../office-party.jpg";
            } else if($scope.photos[i].occasionName == "Gala") {
                $scope.photos[i].image = "../gala.jpg";
            } else if($scope.photos[i].occasionName == "Fundraiser") {
                $scope.photos[i].image = "../fundraiser.jpg";
            }
        }

    });

});
