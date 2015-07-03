/**
 * Created by giladtakoni on 5/13/15.
 */


(function () {


    function LoginController(AuthService, $state, $rootScope, AUTH_EVENTS)
    {

        var self = this;

        this.credentials = {};

        this.send = function(LoginForm){
            if(LoginForm.$valid){
                function onSuccess(response){
                    if(response.data.user){
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess,response.data);
                        $state.go('public.index');
                        return true;
                    }

                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed,response);
                }
                function onFail(reason){
                    if(reason.data.error && reason.data.error.message && reason.data.error.message.sub){
                        self.errorMessages = reason.data.error.message.sub;
                    }
                    $rootScope.$broadcast(AUTH_EVENTS.signUpFailed,reason);
                }

                AuthService.login(this.credentials).then(onSuccess,onFail);
            }
        };
    }

    angular.module('auth').controller('LoginController',['AuthService','$state','$rootScope','AUTH_EVENTS',LoginController]);

})();