(function () {

    function AuthService()
    {
        var authService;

        authService = {};


        function $get($http, User, $q){

            authService.login = function (credentials) {
                return $http
                    .post('/login', credentials)
                    .then(function (res) {
                        User.create(res.data.id, res.data.user.id,
                            res.data.user.role);
                        return res.data.user;
                    });
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

            return authService;
        }

        this.$get = ['$http','User','$q', $get ];
    }

    angular.module('auth').provider('AuthService',[AuthService]);

})();