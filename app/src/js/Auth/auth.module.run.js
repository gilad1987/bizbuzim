(function () {

    function Run(AuthService, $rootScope, User, $state)
    {
        AuthService.getLogged().then(function(response){
            if(User.isAuthenticate()){
                $state.go('public.index');
            }
        });
    }

    angular.module('auth').run(['AuthService','$rootScope','User','$state',Run]);

})();