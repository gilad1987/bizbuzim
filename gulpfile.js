var gulp = require('gulp'),
    inject = require("gulp-inject"),
    html2js = require('gulp-html2js'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

var SCRIPTS_SRC = [
    'app/components/jquery/dist/jquery.js',
    'app/components/angular/angular.js',
    'app/components/angular-ui-router/release/angular-ui-router.js',
    'app/components/angular-bootstrap/ui-bootstrap-tpls.js',
    //'app/components/angular-bootstrap/angular-recursion.js',
    //'app/components/angular-foundation/mm-foundation-tpls.js',

    'app/app/src/js/**/*.services.module.js',
    'app/app/src/js/**/*.directives.module.js',
    'app/app/src/js/**/*.controllers.module.js',

    'app/src/js/*.module.js',
    'app/src/js/**/*.module.js',


    'app/src/js/**/*.srv.js',
    'app/src/js/*.srv.js',

    'app/src/js/**/*.constants.js',
    'app/src/js/*.constants.js',

    'app/src/js/**/*.drv.js',
    'app/src/js/*.drv.js',

    'app/src/js/**/*.ctrl.js',
    'app/src/js/*.ctrl.js',

    'app/src/js/ng-template.js',
    'app/src/js/**/*.module.config.js',

    'app/src/js/*.js',
    'app/src/js/**/*.js',
    '!app/src/js/**/*.test.js',


    'app/src/js/angular.bootstrap.js'
];

var STYLES_SRC = [
    'app/components/bootstrap/dist/css/bootstrap.css',
    'app/components/foundation/css/foundation.css',
    'app/src/css/*.css',
    'app/src/css/**/*.css',
    'app/src/scss/**/*.scss',
    'app/src/scss/*.scss',
    'app/src/js/**/*.css'
];

var NG_HTML_TEMPLATES_SRC =[
    'app/src/js/**/*.html',
    'app/src/ng-templates/*.tpl.html',
    'app/src/ng-templates/**/*.tpl.html'
];

var ANGULAR_MODULE_NAME = 'Bizbuzim';

var VERSION = (function(){
    var min,max;
    min=0; max=9999;

    return (Math.floor(Math.random() * (max - min + 1)) + min);

})();

is_production = false;

/* ------------------------------------- include resource to html ---------------------------------------*/

// must in html fro Scripts     <!-- inject:js --><!-- endinject -->
// must in html fro Css         <!-- inject:css --><!-- endinject -->

gulp.task('js_css_injector:developer', function() {

    var options = {
        addRootSlash:false,
        transform: function (filepath, file, i, length) {
            var tag;

            if(filepath.indexOf('.css') != -1){
                tag = "<link rel='stylesheet' href='<filename>'>";
            }
            if(filepath.indexOf('.js') != -1){
                tag = "<script src='<filename>'></script>";
            }

            function getRandomVersion(){
                var min,max;
                min=0; max=9999;

                return (Math.floor(Math.random() * (max - min + 1)) + min);

            }

            return tag.replace("<filename>",''+filepath+'?v='+getRandomVersion());
        }
    };

    var resources;

    if(is_production){
        resources = ['dist/style.min.css','dist/script.min.js'];
    }else{
        resources = SCRIPTS_SRC.concat(STYLES_SRC);
    }


    gulp.src('index.html')
        .pipe(inject(gulp.src(resources,{read: false}),options))
        .pipe(gulp.dest(""));
});

/* ------------------------------------- templates:developer --------------------------------------------*/

gulp.task('templates:developer', function() {
    gulp.src(NG_HTML_TEMPLATES_SRC)
        .pipe(html2js({
            outputModuleName: ANGULAR_MODULE_NAME,
            useStrict: true
        }))
        .pipe(concat('ng-template.js'))
        .pipe(gulp.dest('app/src/js'))
});

/* ------------------------------------- watch:ng-templates --------------------------------------------*/

gulp.task('watch:ng-templates', function() {
    gulp.watch('app/src/js/**/*.tpl.html', ['templates:developer']);
});

/* ------------------------------------- watch:scripts --------------------------------------------*/

gulp.task('watch:injector_js_css_to_html', function() {
    gulp.watch([
            'app/src/js/**/*.js','app/src/js/*.js',
            'app/src/**.css','app/src/**/*.css',
            'app/src/**.scss','app/src/**/*.scss'],

        ['js_css_injector:developer']
    );
});

/* ------------------------------------- watch:scss --------------------------------------------*/

gulp.task('watch:sass', function() {
    gulp.watch(['app/src/**.scss','app/src/**/*.scss'],
        ['sass']
    );
});

/* ------------------------------------- scss --------------------------------------------*/
var sass = require('gulp-sass');
gulp.task('sass', function () {
    gulp.src(['app/src/*.scss','app/src/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app/src/css'));
});


/* ------------------------------------- concat_scripts --------------------------------------------*/
gulp.task('concat_scripts', function() {
    return gulp.src(SCRIPTS_SRC)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

/* ------------------------------------- concat_css --------------------------------------------*/
gulp.task('concat_css', function() {
    return gulp.src(STYLES_SRC)
        .pipe(concat('style.min.css'))
        //.pipe(minifyCss())
        .pipe(gulp.dest('dist/'));
});


/* ------------------------------------- default --------------------------------------------*/
gulp.task('dev',[
        'templates:developer',
        'watch:injector_js_css_to_html',
        'watch:ng-templates',
        'watch:sass'
    ]
);


/* ------------------------------------- build --------------------------------------------*/


gulp.task('build',[
        'templates:developer',
        'concat_scripts',
        'concat_css',
        'js_css_injector:developer'
    ]
);