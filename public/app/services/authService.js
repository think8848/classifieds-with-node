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
                .error(function (error) {
                    throw new Error(error);
                })
        };

        authFactory.logout = function() {
            AuthToken.setToken();
        };

        authFactory.isLoggedIn = function() {
            var token = AuthToken.getToken();

            return (token.token || token.FBToken);
        };

        authFactory.getUser = function() {
            var token = AuthToken.getToken();
            if(token.token) {
                return $http.get('/api/me');
            } else if (token.FBToken) {
                return $http.get('/api/me?facebook=true');
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
            return {
                token: $window.localStorage.getItem('token'),
                FBToken: $window.localStorage.getItem('satellizer_token')
            }
        };

        // todo: rename 'token' to 'classifieds_token'
        authTokenFactory.setToken = function (token) {
            if(token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('satellizer_token');
            }
        };

        return authTokenFactory;

    }])
    .factory('AuthInterceptor', ['$q', '$location', 'AuthToken',
        function ($q, $location, AuthToken) {

        var interceptorFactory = {};

        interceptorFactory.request = function (config) {

            var token = AuthToken.getToken();
            if (token.token || token.FBToken) {
                config.headers['x-access-token'] = token.token || token.FBToken;
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