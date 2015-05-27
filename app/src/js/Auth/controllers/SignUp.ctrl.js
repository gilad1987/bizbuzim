/**
 * Created by giladtakoni on 5/13/15.
 */

(function () {

    function SignUpController(AuthService,$rootScope,AUTH_EVENTS,$state)
    {
        var self = this;

        this.user = {
            //email:'asd@asd.com',
            //first_name:'aS',
            //last_name:'as',
            //password:'123123'
        };

        this.errorMessages = null;
        this.signUpSuccess = false;

        this.send = function(SignUpForm){

            if(SignUpForm.$valid){
                function onSuccess(response){
                    // user create new and login
                    if(response.data.user){
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess,response);
                        $state.go('public.index');
                    }else{
                        self.signUpSuccess = true;
                    }

                    $rootScope.$broadcast(AUTH_EVENTS.signUpSuccess,response);
                }
                function onFail(reason){
                    if(reason.data.error && reason.data.error.message && reason.data.error.message.sub){
                        self.errorMessages = reason.data.error.message.sub;
                    }
                    $rootScope.$broadcast(AUTH_EVENTS.signUpFailed,reason);
                }

                AuthService.signUp(this.user).then(onSuccess,onFail);
            }
        };
    }



    angular.module('auth').controller('SignUpController',['AuthService','$rootScope','AUTH_EVENTS','$state',SignUpController]);

})();