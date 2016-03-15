/*var contr,
    contrInner = false;*/

(function () {

    //"use strict";

    angular
        .module("classifieds")
        .controller("classifiedsCtrl", function ($rootScope, $scope, $mdSidenav, $state, $location, $mdToast, Auth) {

            var vm = this;

            vm.openSidebar = openSidebar;

            vm.loggedIn = Auth.isLoggedIn();

            //$rootScope.$on('$routeChangeStart', function () {
            $rootScope.$on('$stateChangeStart', function () {

                vm.loggedIn = Auth.isLoggedIn();

                Auth.getUser()
                    .then(function (data) {
                        //vm.user = data.data;
                        $rootScope.user = data.data;
                        console.log("state change");
                    });
            });

          /*  vm.doLogin = function () {

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
            };*/

            /*vm.doLogout = function () {
                Auth.logout();
                $state.go('classifieds');
            };*/

            function openSidebar() {
                if (Auth.isLoggedIn()) {
                    $state.go('classifieds.new');
                } else {
                    showToast("Необхідна авторизація (натисніть 'Вхід')");
                }
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(3000)
                );
            }


            /*.controller("classifiedsCtrl", function ($rootScope, $scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

                var vm = this;

                vm.categories;
                vm.classified;
                vm.classifieds;
                vm.closeSidebar = closeSidebar;
                vm.deleteClassified = deleteClassified;
                vm.editing;
                //vm.editClassified = editClassified; // moved to classified-card.dir.js
                vm.openSidebar = openSidebar;
                vm.saveClassified = saveClassified;
                vm.saveEdit = saveEdit;

                vm.classifieds = classifiedsFactory.ref;
                vm.classifieds.$loaded().then(function (classifieds) {
                    vm.categories = getCategories(classifieds);
                });

                $scope.$on('newClassified', function (event, classified) {
                    vm.classifieds.$add(classified);
                    showToast('Товар додано!');
                });

                $scope.$on('editSaved', function (event, message) {
                    showToast(message);
                });

                var contact = {
                    name: "Ryan",
                    phone: 555555,
                    email: 'sdfg@dfg.com'
                };

                function openSidebar() {
                    if ($rootScope.currentUser) {
                        $state.go('classifieds.new');
                    } else {
                        showToast("Необхідна авторизація (натисніть 'Вхід')");
                    }
                }

                function closeSidebar() {
                    $mdSidenav('left').close();
                }

                function saveClassified(classified) {
                    if (classified) {
                        classified.contact = contact;
                        vm.classifieds.push(classified);
                        vm.classified = {};
                        closeSidebar();
                        showToast("Товар Додано!");
                    }
                }

    /!*          // moved to classified-card.dir.js
                function editClassified(classified) {
                    $state.go('classifieds.edit', {
                        id: classified.$id
                    });
                }
    *!/

                function saveEdit() {
                    vm.editing = false;
                    vm.classified = {};
                    closeSidebar();
                    showToast("Редагування збережено!");
                }

                function deleteClassified(event, classified) {
                    var confirm = $mdDialog.confirm()
                        .title('Ви справді хочете видалити ' + classified.title + '?')
                        .ok('Так')
                        .cancel('Ні')
                        .targetEvent(event);

                    $mdDialog.show(confirm).then(function () {
                        vm.classifieds.$remove(classified);
                        showToast('Оголошення видалено!');
                    }, function () {

                    });
                }

                function showToast(message) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(message)
                            .position('top, right')
                            .hideDelay(3000)
                    );
                }

                function getCategories(classifieds) {

                    var categories = [];

                    angular.forEach(classifieds, function (item) {
                        angular.forEach(item.categories, function (category) {
                            categories.push(category)
                        });
                    });

                    return _.uniq(categories);
                }*/
        })
}());