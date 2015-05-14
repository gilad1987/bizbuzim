/**
 * Created by giladtakoni on 5/13/15.
 */

(function () {


    function SignUpController()
    {
        this.user = {};
    }

    SignUpController.prototype.send = function(SignUpForm){
        console.log(SignUpForm);
    };

    angular.module('auth').controller('SignUpController',[SignUpController]);

})();