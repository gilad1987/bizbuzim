(function(module) {
try { module = angular.module("Bizbuzim"); }
catch(err) { module = angular.module("Bizbuzim", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/src/js/Auth/auth.tpl.html",
    "<div class=\"form\">\n" +
    "\n" +
    "    <ul class=\"tab-group\">\n" +
    "        <li class=\"tab \"><a href=\"#signup\">Sign Up</a></li>\n" +
    "        <li class=\"tab active\"><a href=\"#login\">Log In</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"tab-content\">\n" +
    "\n" +
    "        <div ng-include=\"'app/src/js/Auth/tpl/login.tpl.html'\" class=\"tabs\"></div>\n" +
    "        <div ng-include=\"'app/src/js/Auth/tpl/signup.tpl.html'\" class=\"tabs\"></div>\n" +
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
  $templateCache.put("app/src/js/Auth/tpl/login.tpl.html",
    "<div id=\"login\" >\n" +
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
  $templateCache.put("app/src/js/Auth/tpl/signup.tpl.html",
    "<div id=\"signup\" >\n" +
    "    <h1>Sign Up for Free</h1>\n" +
    "\n" +
    "    <form action=\"/\" method=\"post\">\n" +
    "\n" +
    "        <div class=\"top-row\">\n" +
    "            <div class=\"field-wrap\">\n" +
    "                <label>\n" +
    "                    First Name<span class=\"req\">*</span>\n" +
    "                </label>\n" +
    "                <input type=\"text\" required autocomplete=\"off\" />\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"field-wrap\">\n" +
    "                <label>\n" +
    "                    Last Name<span class=\"req\">*</span>\n" +
    "                </label>\n" +
    "                <input type=\"text\"required autocomplete=\"off\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
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
    "                Set A Password<span class=\"req\">*</span>\n" +
    "            </label>\n" +
    "            <input type=\"password\"required autocomplete=\"off\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <button type=\"submit\" class=\"button button-block\">Get Started</button>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);
})();
