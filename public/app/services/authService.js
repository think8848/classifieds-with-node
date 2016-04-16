angular.module('authService', [])


    .factory('Auth', ['$http', '$q', 'AuthToken',
        function($http, $q, AuthToken) {

        var authFactory = {};

        authFactory.login = function(username, password) {

            return $http.post('/api/login', {
                username: username,
                password: password
            })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                })

        };

        authFactory.logout = function() {
            AuthToken.setToken();
        };

        authFactory.isLoggedIn = function() {
            var token = AuthToken.getToken();
            if (token) {
                return true;
            } else {
                return false;
            }
        };

        authFactory.getUser = function() {
            if(AuthToken.getToken()) {
                return $http.get('/api/me');
            } else {
                return $q.reject({ message: "User has no token" });
            }
        };

        return authFactory;
    }])
    .factory('AuthToken', ['$window',
        function ($window) {

        var authTokenFactory = {};

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        // todo: rename 'token' to 'classifieds_token'
        authTokenFactory.setToken = function (token) {
            if(token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        };

        return authTokenFactory;

    }])
    .factory('AuthInterceptor', ['$q', '$location', 'AuthToken',
        function ($q, $location, AuthToken) {

        var interceptorFactory = {};

        interceptorFactory.request = function (config) {

            var token = AuthToken.getToken();

            if(token) {
                config.headers['x-access-token'] = token;
            }

            return config;

        };

        interceptorFactory.responseError = function (response) {
            if(response.status == 403) {
                //$location.path('/classifieds'); // had to comment it out because it was causing problems
                //$state.go('classifieds');
            }
            return $q.reject(response);
        };

        return interceptorFactory;
    }]);