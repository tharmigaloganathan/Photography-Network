var app = angular.module('myApp', []);
app.controller('imagesController', function($scope, $http) {

    $( document ).ready(function() {
        console.log( "ready! browse" );
        $('.ui.heart.rating')
          .rating({initialRating: 0,})
        ;
    });

    function httpGetAsync(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){}
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }


    $http.get("http://localhost:3000/get-images")
    .then(function(response){
        $scope.photos = response.data;

        function getRandom(arr, n) {
            var result = new Array(n),
                len = arr.length,
                taken = new Array(len);
            if (n > len)
                throw new RangeError("getRandom: more elements taken than available");
            while (n--) {
                var x = Math.floor(Math.random() * len);
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len;
            }
            return result;
        }

        $scope.addLike = function(pictureID) {
            console.log(pictureID);
            httpGetAsync("http://localhost:3000/add-like/"+pictureID);
        }

        $scope.photos = getRandom($scope.photos, 100);

        for(var i = 0; i < $scope.photos.length; i++) {
            $scope.photos[i].date = new Date($scope.photos[i].date);
            $scope.photos[i].date = $scope.photos[i].date.toDateString();
            if($scope.photos[i].pictureURL) {
                $scope.photos[i].image = $scope.photos[i].pictureURL;
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
        console.log($scope.photos);
    });




});
