(function () {

    function AuthService()
    {
        var authService;

        authService = {};


        function $get($http, User, $q){

            authService.login = function (credentials) {


                var deferred = $q.defer();

                function onSuccess(response){
                    if(response.data.error){
                        onFail(response);
                    }
                    if(response.data.user){
                        response.data.user.authToken = response.data.token;
                        User.create(response.data.user);
                    }
                    deferred.resolve(response);
                }

                function onFail(reason){
                    deferred.reject(reason);
                }

                $http.post('api/user', credentials).then(onSuccess,onFail);
                return deferred.promise;

            };

            authService.signUp = function (user) {

                var deferred = $q.defer();

                function onSuccess(response){
                    if(response.data.error){
                        onFail(response);
                    }
                    if(response.data.user){
                        response.data.user.authToken = response.data.token;
                        User.create(response.data.user);
                    }
                    deferred.resolve(response);
                }

                function onFail(reason){
                    deferred.reject(reason);
                }

                $http.post('api/user', user).then(onSuccess,onFail);

                return deferred.promise;
            };

            authService.isAuthenticated = function () {
                return !!User.get();
            };

            authService.isAuthorized = function(authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(User.userRole) !== -1);
            };

            authService.getLogged = function(){
                var deferred = $q.defer();

                function onSuccess(response){
                    if(response.data.user){
                        User.create(response.data.user);
                    }

                    deferred.resolve(response);
                }

                function onFail(reason){
                    deferred.reject(reason);
                }

                $http.get('api/user').then(onSuccess,onFail);

                return deferred.promise;
            };

            return authService;
        }

        this.$get = ['$http','User','$q', $get ];
    }

    angular.module('auth').provider('AuthService',[AuthService]);

})();