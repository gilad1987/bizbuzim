
(function (angular) {

    function AuthDirective($timeout)
    {

        function AuthController()
        {

        }

        return  {
            templateUrl: 'app/src/js/auth/auth.tpl.html',
            scope: {},
            //controller: [AuthController],
            //controllerAs: 'AuthCtrl',
            link:function(scope,element,attrs){


                function onTimeout(){

                    $(element).find('input, textarea').on('keyup blur focus', function (e) {

                        var $this = $(this),
                            label = $this.prev('label');

                        if (e.type === 'keyup') {
                            if ($this.val() === '') {
                                label.removeClass('active highlight');
                            } else {
                                label.addClass('active highlight');
                            }
                        } else if (e.type === 'blur') {
                            if( $this.val() === '' ) {
                                label.removeClass('active highlight');
                            } else {
                                label.removeClass('highlight');
                            }
                        } else if (e.type === 'focus') {

                            if( $this.val() === '' ) {
                                label.removeClass('highlight');
                            }
                            else if( $this.val() !== '' ) {
                                label.addClass('highlight');
                            }
                        }

                    });

                }

                $timeout(onTimeout,0,false);


                $(element).find('.tab a').on('click', function (e) {

                        e.preventDefault();

                        $(this).parent().addClass('active');
                        $(this).parent().siblings().removeClass('active');

                        target = $(this).attr('href');

                        $('.tab-content .tabs').not(target).hide();

                        $(target).parent().fadeIn(600);

                });


            }
        };
    }

    angular.module('auth').directive('gtAuth',['$timeout',AuthDirective]);

})(angular);