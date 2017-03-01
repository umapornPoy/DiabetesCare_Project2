

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

    refresh();


    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post(DatabaseServer + '/diabetesmember', $scope.contact).success(function (response) {
            console.log(response);
            refresh();
        });
    };

    $scope.login = function (id) {
        console.log(id);
        $http.get(DatabaseServer + '/diabetesmember' + id, $scope.contact).success(function (response) {
            console.log(response);
            refresh();

        diabetesmember.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
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