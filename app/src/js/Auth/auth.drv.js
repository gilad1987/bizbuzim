
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

                function initBinding(){

                    element.find('input, textarea').on('keyup blur focus', function (e) {


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

                    //var documentForms = document.forms;
                    //
                    //for(var i = 0; i < documentForms.length; i++){
                    //    for(var j = 0; j < documentForms[i].elements.length; j++){
                    //        var input = documentForms[i].elements[j];
                    //
                    //        if(input.type == "text" || input.type == "password" || input.type == "email" || input.type == null){
                    //            var text = input.value;
                    //            input.focus();
                    //            var event = document.createEvent('TextEvent');
                    //            event.initTextEvent('textInput', true, true, window, 'a');
                    //            input.dispatchEvent(event);
                    //            input.value = text;
                    //            input.blur();
                    //        }
                    //    }
                    //}

                }

                scope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams){
                        $timeout(initBinding,0);
                });
                $timeout(initBinding,0);
            }
        };
    }

    angular.module('auth').directive('gtAuth',['$timeout',AuthDirective]);

})(angular);