var signin = angular.module('SigninApp', ['ngRoute']);
signin.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "Login/login"
        })

});

signin.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
 
    function Login(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;

        vm.login = function (loginData) {
            return $http.post('/api/authenticate', loginData);
        }
        return vm;

        function login(user) {
            UserService.login(user, function (response) {
                console.log(response);
                if (response == null) {

                }
                else {
                    $rootScope.currentUser = response;
                    $location.url("/");
                }
            });
        }
}

    //$scope.signin = function (signin) {

    //    var DatabaseServer = 'http://localhost:61576'
    //    var contact = JSON.parse(localStorage.getItem('username', 'password'));
    //    var refresh = function () {
    //        $http.get(DatabaseServer + '/diabetesmember' + id).success(function (response) {
    //            console.log("I got the data I requested");
    //            if (response.status == 0) {
    //                $scope.diabetesmember = response.dataResult;

    //                db.authenticate('username', 'password', function (err, result) {
    //                    assert.equal(true, result);
    //                    db.close();
    //                });

    //                localStorage.setItem('username', 'password', JSON.stringify($scope.diabetesmember));
    //                $scope.contact = "";
    //                parent.location = '/';
    //                console.log(response);

    //                $scope.statusLogin = 1;

    //                localStorage.setItem('loginStatus', 0);

    //            } else {
    //                $scope.statusLogin = 0;
    //                new PNotify({
    //                    title: 'WRONG !!',
    //                    type: 'error',
    //                    text: 'The username or password is incorrect.',
    //                    nonblock: {
    //                        nonblock: true
    //                    },
    //                    styling: 'bootstrap3',
    //                    //addclass: 'dark'
    //                })
    //            }

    //        });
    //    };
    //};

    var diabetes = JSON.parse(localStorage.getItem('diabetesmember'));
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

    $scope.login = function () {
        console.log($scope.contact._id);
        $http.get(DatabaseServer + '/diabetesmember' + $scope.contact._id, $scope.contact).success(function (response) {
            console.log(response);
            $scope.contact = "";
            parent.location = '/';
            localStorage.setItem('diabetesmember' + id, JSON.stringify($scope.contact._id));
            refresh();
       

            diabetesmember.findOne({
                query: { _id: mongojs.ObjectId(id) },
            username: username, password: password
        }, function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!user) {
                res.send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                return res.status(200).send();
            }
        });
         });
    };

}])