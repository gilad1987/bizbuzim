(function () {

    function Run(AuthService, $rootScope)
    {
        AuthService.getLogged().then(function(){
            console.log('AuthService.getLogged');
        });
    }

    angular.module('auth').run(['AuthService','$rootScope',Run]);

})();