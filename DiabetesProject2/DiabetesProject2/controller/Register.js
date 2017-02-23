

app.controller('RegisterController', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from controller");
    var DatabaseServer = 'http://localhost:61576'
    var refresh = function () {
        $http.get(DatabaseServer + '/diabetesmember').success(function (response) {
            console.log("I got the data I requested");
            $scope.diabetesmember = response;
            $scope.contact = "";
        });
    };

    //refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post(DatabaseServer + '/diabetesmember', $scope.contact).success(function (response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete(DatabaseServer + '/diabetesmember/' + id).success(function (response) {
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get(DatabaseServer + '/diabetesmember/' + id).success(function (response) {
            $scope.contact = response;
        });
    };

    $scope.update = function () {
        console.log($scope.contact._id);
        $http.put(DatabaseServer + '/diabetesmember/' + $scope.contact._id, $scope.contact).success(function (response) {
            refresh();
        })
    };

    $scope.deselect = function () {
        $scope.contact = "";
    }


}]);