(function () {

    function Config($stateProvider, $urlRouterProvider, $locationProvider){

        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when("", "/signup");

        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});

        // public state
        $stateProvider

            .state('public', {
                abstract: true,
                templateUrl: "app/src/js/ng-templates/index.tpl.html"
            })
            .state('public.index', {
                url: '/',
                views:{
                    "@":{
                        template: '<h1>welcome</h1> <div style="text-align: center"><h2><a ui-sref="user.login">SignUp</a></h2></div>'
                    }
                }

            });

        // user state
        $stateProvider
            .state('user', {
                abstract: true,
                views:{
                    "@":{
                        template: '<div gt-auth></div>'
                    }
                }
            })

            .state('user.login', {
                url: '/login',
                views:{
                    "":{
                        templateUrl: 'app/src/js/Auth/partials/login.tpl.html'
                    }
                }

            })
            .state('user.signup', {
                url: '/signup',
                views:{
                    "":{
                        templateUrl: 'app/src/js/Auth/partials/signup.tpl.html'
                    }
                }
            });
    }

    angular.module('auth').config(['$stateProvider','$urlRouterProvider','$locationProvider',Config]);

})();