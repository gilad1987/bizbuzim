/**
 * Created by giladtakoni on 5/13/15.
 */

(function () {

    function SignUpController(AuthService)
    {
        this.user = {};

        this.send = function(SignUpForm){

            if(SignUpForm.$valid){
                AuthService.signUp(this.user);
            }
        };
    }



    angular.module('auth').controller('SignUpController',['AuthService',SignUpController]);

})();