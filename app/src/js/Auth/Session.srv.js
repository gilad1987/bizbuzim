(function () {

    function Session()
    {

        var user = null;

        /**
         *
         * @param params
         * @constructor
         */
        function User(params){

            this.id = null;
            this.userId = null;
            this.userRole = null;
            this.image = null;
            this.first_name = null;
            this.last_name = null;

            for(var key in params){
                if(this.hasOwnProperty(key)){
                    this[key] = params[key];
                }
            }

        }

        function $get(){

            function create(params){
                return user = new User(params);
            }

            function destroy(){
                user = null;
                return true;
            }

            function getLoggedUser(){
                return getLoggedUser;
            }

            return {
                create:create,
                destroy:destroy,
                getLoggedUser:getLoggedUser
            }

        }

        this.$get = [$get];
    }

    angular.module('auth').provider('Session',[Session]);

})();