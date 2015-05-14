(function(module) {
try { module = angular.module("Bizbuzim"); }
catch(err) { module = angular.module("Bizbuzim", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/src/js/Auth/auth.tpl.html",
    "<div class=\"form\">\n" +
    "\n" +
    "    <ul class=\"tab-group\">\n" +
    "        <li class=\"tab\" ><a ui-sref=\"user.private.login\" ui-sref-active=\"active\">Log In</a></li>\n" +
    "        <li class=\"tab\"><a ui-sref=\"user.private.signup\" ui-sref-active=\"active\">Sign Up</a></li>\n" +
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
    "<div id=\"login\" class=\"active\">\n" +
    "    <h1>Welcome Back!</h1>\n" +
    "\n" +
    "    <form action=\"/\" method=\"post\">\n" +
    "\n" +
    "        <div class=\"field-wrap\">\n" +
    "            <label>\n" +
    "                Email Address<span class=\"req\">*</span>\n" +
    "            </label>\n" +
    "            <input type=\"email\"required autocomplete=\"off\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"field-wrap\">\n" +
    "            <label>\n" +
    "                Password<span class=\"req\">*</span>\n" +
    "            </label>\n" +
    "            <input type=\"password\"required autocomplete=\"off\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <p class=\"forgot\"><a href=\"#\">Forgot Password?</a></p>\n" +
    "\n" +
    "        <button class=\"button button-block\">Log In</button>\n" +
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
    "    <h1>Sign Up for Free</h1>\n" +
    "\n" +
    "    <form action=\"/\" method=\"post\" name=\"SignUpForm\" novalidate>\n" +
    "\n" +
    "        <div class=\"top-row\">\n" +
    "            <div class=\"field-wrap\">\n" +
    "                <label>\n" +
    "                    First Name<span class=\"req\">*</span>\n" +
    "                </label>\n" +
    "                <input type=\"text\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.first_name\" name=\"first_name\"/>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"field-wrap\">\n" +
    "                <label>\n" +
    "                    Last Name<span class=\"req\">*</span>\n" +
    "                </label>\n" +
    "                <input type=\"text\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.last_name\" name=\"last_name\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"field-wrap\">\n" +
    "            <label>\n" +
    "                Email Address<span class=\"req\">*</span>\n" +
    "            </label>\n" +
    "            <input type=\"email\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.email\" name=\"email\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"field-wrap\">\n" +
    "            <label>\n" +
    "                Set A Password<span class=\"req\">*</span>\n" +
    "            </label>\n" +
    "            <input type=\"password\" required autocomplete=\"off\" ng-model=\"SignUpCtrl.user.password\" name=\"password\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <button type=\"button\" class=\"button button-block\" ng-click=\"SignUpCtrl.send(SignUpForm)\">Get Started</button>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);
})();
