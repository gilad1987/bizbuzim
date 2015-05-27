(function () {

    function Run(AuthService,$rootScope)
    {
        $rootScope.$on('$stateChangeStart',function(event,next){

        });

    }

    angular.module('Bizbuzim').run(['AuthService','$rootScope',Run]);

})();