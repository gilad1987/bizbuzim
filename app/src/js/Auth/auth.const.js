/**
 * Created by giladtakoni on 5/14/15.
 */

(function(angular){

    angular.module('auth')

        .constant('AUTH_EVENTS', {
            signUpSuccess:'sign-up-success',
            signUpFailed:'sign-up-Filed',
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })

        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            guest: 'guest'
        })

})(angular);