(function () {

    function Config($httpProvider,$stateProvider,$urlRouterProvider)
    {

        $urlRouterProvider.otherwise('/');

        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';


        $stateProvider

            .state('public', {
                abstract: true,
                templateUrl: "app/src/js/ng-templates/index.tpl.html"
            })

            .state('public.index', {
                url: '/',
                views:{
                    "@":{
                        templateProvider:[
                            'User',
                            function(User){
                                if(User.get()){
                                    return '<h1>Hellow '+User.get().first_name+' '+User.get().last_name+' ( logged )</h1>'
                                }
                                return '<h1>welcome</h1> <div style="text-align: center"><h2><a ui-sref="auth.private.signup">SignUp</a></h2></div>';
                            }
                        ]
                    }
                }

            })
    }

    angular.module('Bizbuzim').config(['$httpProvider','$stateProvider','$urlRouterProvider',Config]);

})();