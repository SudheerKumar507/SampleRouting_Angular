    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'views/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'views/contact.html',
                controller  : 'contactController'
            })
            .when('/register', {
                templateUrl : 'views/register.html',
                controller  : 'registerController'
            })
            .when('/login', {
                templateUrl : 'views/login.html',
                controller  : 'loginController'
            });
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
    'use strict';

/**
 * @ngdoc function
 * @name arimughamApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the arimughamApp
 */
angular.module('scotchApp')
 .controller('LoginCtrl', function($scope, $global, $uibModalInstance, commonSevices) {

        $scope.openRigistration = function() {
            $scope.ok({ registration: true });

        }
        $scope.openForgotPassword = function() {
            $scope.ok({ forgotPassword: true });

        }

        $scope.login = function() {
            if ($scope.dataform.$invalid) {
                return false;
            };
            commonSevices.login($scope.data).then(function(res) {
                if (res.status == $global.SUCCESS) {
                    $scope.ok({ login: true, data: res.data });
                    $global.setLocalItem('authentication', res.data, true);
                    $global.init();
                }
            },function(err){
                if (err.status == $global.FAILURE) {
                    $global.showErrorMessage(err.message);
                }
            })
        }

        $scope.ok = function(res) {
            $uibModalInstance.close(res);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.validate = function() {
            $scope.isEmail = $scope.dataform.email.$error.required;
            $scope.isPassword = $scope.dataform.password.$error.required;
        }
    });
    scotchApp.controller("registerController", function ($scope) {
        (function () {
    'use strict';

    angular
        .module('scotchApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
});

