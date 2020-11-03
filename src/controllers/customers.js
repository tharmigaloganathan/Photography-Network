var app = angular.module('myApp', []);
app.controller('customersController', function($scope, $http) {

    $http.get("http://localhost:3000/customer-info")
    .then(function(response){
        $scope.customerInfo = response.data;
        console.log($scope.customerInfo);
        $scope.displayData = [$scope.customerInfo.length];
        console.log($scope.displayData);
        for(var i = 0; i < $scope.customerInfo.length; i++) {
            $scope.newCustomer = {};
            $scope.newCustomer.eventID = $scope.customerInfo[i].eventID;
            $scope.newCustomer.fName = $scope.customerInfo[i].fName;
            $scope.newCustomer.lName = $scope.customerInfo[i].lName;
            $scope.newCustomer.date = new Date($scope.customerInfo[i].date);
            $scope.newCustomer.date = $scope.newCustomer.date.toDateString();
            $scope.newCustomer.occasionName = $scope.customerInfo[i].occasionName;
            $scope.newCustomer.numberOfLikes = $scope.customerInfo[i].numberOfLikes;
            $scope.displayData[i] = $scope.newCustomer;
        }
        console.log($scope.displayData);
    });

});
