(function () {

    "use strict";

    angular
        .module('classifieds')
        .controller('loginClassifiedsCtrl',
        ['$scope', '$mdSidenav', '$state',
        function ($rootScope, $scope, $mdSidenav, $state, Auth) {

            var vm = this;

            this.sidenavOpen = true;

            $scope.$watch('vm.sidenavOpen', function (sidenav) {
                if (sidenav === false) {
                    $mdSidenav('right')
                        .close()
                        .then(function () {
                            $state.go('classifieds');
                        });
                }
            });

            vm.doLogin = function () {

                vm.processing = true;

                vm.error = '';

                Auth.login(vm.loginData.username, vm.loginData.password)
                    .success(function (data) {
                        vm.processing = false;

                        Auth.getUser()
                            .then(function (data) {
                                $rootScope.user = data.data;
                                vm.user = data.data;
                            });
                        if(data.success) {
                            $state.go('classifieds');
                        } else {
                            vm.error = data.message;
                        }
                    });
            };

            vm.doLogout = function () {
                Auth.logout();
                $state.go('classifieds');
            };

            /*$scope.login = function () {
                Authentication.login($scope.user);
            }; // login

            $scope.logout = function () {
                Authentication.logout();
            }; // logout*/

        }]);
}());