(function(module) {
try { module = angular.module("Bizbuzim"); }
catch(err) { module = angular.module("Bizbuzim", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/src/js/Auth/auth.tpl.html",
    "<div class=\"form auth\">\n" +
    "\n" +
    "    <ul class=\"tab-group\">\n" +
    "        <li class=\"tab\" ><a ui-sref=\"auth.private.login\" ui-sref-active=\"active\">Log In</a></li>\n" +
    "        <li class=\"tab\"><a ui-sref=\"auth.private.signup\" ui-sref-active=\"active\">Sign Up</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"tab-content\">\n" +
    "\n" +
    "        <div class=\"tabs\">\n" +
    "            <div ui-view></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div><!-- tab-content -->\n" +
    "\n" +
    "</div> <!-- /form -->");
}]);
})();

(function(module) {
try { module = angular.module("Bizbuzim"); }
catch(err) { module = angular.module("Bizbuzim", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/src/js/Dashboard/inedx.tpl.html",
    "<div style=\"display: none\">\n" +
    "    <h1>welcome</h1> <div style=\"text-align: center\"><h2><a ui-sref=\"auth.private.signup\">SignUp</a></h2></div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"site dashboard-wrapper\">\n" +
    "    <div class=\"menu years align-right\">\n" +
    "        <ul>\n" +
    "            <li><a href=\"#\" class=\"button \" title=\"2010\">2008</a></li>\n" +
    "            <li><a href=\"#\" class=\"button secondary\" title=\"2010\">2009</a></li>\n" +
    "            <li><a href=\"#\" class=\"button \" title=\"2010\">2010</a></li>\n" +
    "            <li><a href=\"#\" class=\"button \" title=\"2010\">2011</a></li>\n" +
    "            <li><a href=\"#\" class=\"button \" title=\"2010\">2012</a></li>\n" +
    "            <li><a href=\"#\" class=\"button \" title=\"2010\">2013</a></li>\n" +
    "            <li><a href=\"#\" class=\"button \" title=\"2010\">2014</a></li>\n" +
    "            <li><a href=\"#\" class=\"button \" title=\"2010\">2015</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"year-content align-right\">\n" +
    "        <ul class=\"menu month\">\n" +
    "            <li><a href=\"#\" class=\"button small\" title=\"2010\">פבואר</a></li>\n" +
    "            <li><a href=\"#\" class=\"button secondary small\" title=\"2010\">מרץ</a></li>\n" +
    "            <li><a href=\"#\" class=\"button  small\" title=\"2010\">אפריל</a></li>\n" +
    "            <li><a href=\"#\" class=\"button  small\" title=\"2010\">מאי</a></li>\n" +
    "            <li><a href=\"#\" class=\"button  small\" title=\"2010\">יוני</a></li>\n" +
    "            <li><a href=\"#\" class=\"button  small\" title=\"2010\">יולי</a></li>\n" +
    "            <li><a href=\"#\" class=\"button  small\" title=\"2010\">אוגוסט</a></li>\n" +
    "            <li><a href=\"#\" class=\"button  small\" title=\"2010\">ספטמבר</a></li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <div class=\"clear\"></div>\n" +
    "\n" +
    "        <div class=\"month-content\">\n" +
    "            month-content\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"clear\"></div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("Bizbuzim"); }
catch(err) { module = angular.module("Bizbuzim", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/src/js/ng-templates/index.tpl.html",
    "<h1>index</h1>\n" +
    "<div ng-view></div>");
}]);
})();

(function(module) {
try { module = angular.module("Bizbuzim"); }
catch(err) { module = angular.module("Bizbuzim", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/src/js/Auth/partials/login.tpl.html",
    "<div id=\"login\" class=\"active\" ng-controller=\"LoginController as LoginCtrl\">\n" +
    "    <h1>Welcome Back!</h1>\n" +
    "\n" +
    "    <form action=\"/\" method=\"post\" name=\"LoginForm\">\n" +
    "\n" +
    "        <div class=\"field-wrap\">\n" +
    "            <label>\n" +
    "                Email Address<span class=\"req\">*</span>\n" +
    "            </label>\n" +
    "            <input type=\"email\" ng-model=\"LoginCtrl.credentials.email\" name=\"email\" required autocomplete=\"off\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"field-wrap\">\n" +
    "            <label>\n" +
    "                Password<span class=\"req\">*</span>\n" +
    "            </label>\n" +
    "            <input type=\"password\" ng-model=\"LoginCtrl.credentials.password\" name=\"password\" required autocomplete=\"off\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <p class=\"forgot\"><a href=\"#\">Forgot Password?</a></p>\n" +
    "\n" +
    "        <button class=\"button button-block\" ng-click=\"LoginCtrl.send(LoginForm)\">Log In</button>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("Bizbuzim"); }
catch(err) { module = angular.module("Bizbuzim", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/src/js/Auth/partials/signup.tpl.html",
    "<div id=\"signup\" class=\"active\" ng-controller=\"SignUpController as SignUpCtrl\">\n" +
    "\n" +
    "    <div ng-if=\"SignUpCtrl.signUpSuccess\" class=\"success-sign-up-message\">\n" +
    "        <h3>You received email to confirm account</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"!SignUpCtrl.signUpSuccess\">\n" +
    "\n" +
    "        <h1>Sign Up for Free</h1>\n" +
    "\n" +
    "        <form action=\"/\" method=\"post\" name=\"SignUpForm\" novalidate>\n" +
    "\n" +
    "            <div class=\"top-row\">\n" +
    "                <div class=\"field-wrap\">\n" +
    "                    <label>\n" +
    "                        First Name<span class=\"req\">*</span>\n" +
    "                    </label>\n" +
    "                    <input type=\"text\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.first_name\" name=\"first_name\"/>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"field-wrap\">\n" +
    "                    <label>\n" +
    "                        Last Name<span class=\"req\">*</span>\n" +
    "                    </label>\n" +
    "                    <input type=\"text\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.last_name\" name=\"last_name\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"field-wrap\">\n" +
    "                <label>\n" +
    "                    Email Address<span class=\"req\">*</span>\n" +
    "                </label>\n" +
    "                <input type=\"email\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.email\" name=\"email\"/>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"field-wrap\">\n" +
    "                <label>\n" +
    "                    Set A Password<span class=\"req\">*</span>\n" +
    "                </label>\n" +
    "                <input type=\"password\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.password\" name=\"password\"/>\n" +
    "            </div>\n" +
    "\n" +
    "            <ul ng-if=\"SignUpCtrl.errorMessages != null\" class=\"errors\">\n" +
    "                <li ng-repeat=\"errorMessage in SignUpCtrl.errorMessages track by $index\">{{errorMessage}}</li>\n" +
    "            </ul>\n" +
    "            <button type=\"button\" class=\"button button-block\" ng-click=\"SignUpCtrl.send(SignUpForm)\">Get Started</button>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);
})();
