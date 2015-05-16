(function () {

    function User()
    {

        var user = null;

        /**
         *
         * @param params
         * @constructor
         */
        function User(params){
            this.id = null;
            this.userRole = null;
            this.picture = null;
            this.first_name = null;
            this.last_name = null;
            this.authToken = null;

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

            function get(){
                return user;
            }

            function getAuthToken(){
                return user.authToken;
            }

            return {
                create:create,
                destroy:destroy,
                get:get,
                getAuthToken:getAuthToken
            }

        }

        this.$get = [$get];
    }

    angular.module('auth').provider('User',[User]);

})();