(function () {

    "use strict";

    angular
        .module('classifieds')
        .controller('loginClassifiedsCtrl',
        ['$rootScope', '$scope', '$mdSidenav', '$state', '$auth', 'Auth',
        function ($rootScope, $scope, $mdSidenav, $state, $auth, Auth) {

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
                                //vm.user = data.data;
                            });

                        if(data.success) {
                            $state.go('classifieds');
                        } else {
                            vm.error = data.message;
                        }
                    });
            };

            vm.authenticate = function(provider) { // facebook авторизація
                $auth.authenticate(provider)
                    .then(function (data) {
                        $rootScope.user = data.data.user;
                        $rootScope.user.id = $rootScope.user._id;
                        //console.log($rootScope.user);
                        $state.go('classifieds');
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                /*Auth.getUser()
                    .then(function (data) {
                        console.log(data.data);
                        $rootScope.user = data.data;
                        //vm.user = data.data;
                        $state.go('classifieds');
                    },
                    function (err) {
                        console.log(err);
                    });*/
            };

        }]);
}());