/**
 * Created by giladtakoni on 5/13/15.
 */


(function () {


    function LoginController()
    {

        this.credentials = {};

        this.send = function(LoginForm){

            if(LoginForm.$valid){
                function onSuccess(response){
                    if(response.data.user){
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess,response);
                        $state.go('public.index');
                    }

                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed,response);
                }
                function onFail(reason){
                    if(reason.data.error && reason.data.error.message && reason.data.error.message.sub){
                        self.errorMessages = reason.data.error.message.sub;
                    }
                    $rootScope.$broadcast(AUTH_EVENTS.signUpFailed,reason);
                }

                AuthService.signUp(this.credentials).then(onSuccess,onFail);
            }
        };
    }

    angular.module('auth').controller('LoginController',[LoginController]);

})();