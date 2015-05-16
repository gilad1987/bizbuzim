(function () {

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function Config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

        $httpProvider.defaults.headers.common['X-AuthToken'] = function(){
            return 'token';
        };


        //$urlRouterProvider.when("", "/signup");

        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});


        // user state
        $stateProvider
            .state('auth', {
                abstract: true,
                views:{
                    "@":{
                        template: '<div ui-view></div>'
                    }
                }
            })

            .state('auth.private', {
                //url: '',
                views:{
                    "":{
                        template: '<div gt-auth></div>'
                    }
                }

            })

            .state('auth.private.login', {
                url: '/login',
                views:{
                    "":{
                        templateUrl: 'app/src/js/Auth/partials/login.tpl.html'
                    }
                }

            })

            .state('auth.private.signup', {
                url: '/signup',
                views:{
                    "":{
                        templateUrl: 'app/src/js/Auth/partials/signup.tpl.html'
                    }
                }
            });
    }

    angular.module('auth').config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider',Config]);

})();