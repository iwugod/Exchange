/* gulpfile.js */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber');

// source and distribution folder
var source = 'public/',
    dest = 'public/';

// Bootstrap scss source
var bootstrapSass = {
        in: './bower_components/bootstrap-sass/'
    };

    // Jquery source
var jqueryPlugin = {
        in: './bower_components/jquery/'
    };


    // AngularJS
var angualrPlugin = {
        in: './bower_components/'
    };
    
// fonts
var fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    };

    // jquery
var jry = {
        in: [source + 'dist/*.*', jqueryPlugin.in + 'dist/**/*'],
        out: dest + 'css/jquery'
    };

var angularjs = {
    in: [source + 'angular/*.*', angualrPlugin.in + 'angular/**/*'],
    out: dest + 'css/angular'
};

var angularjsRoute = {
    in: [source + 'angular-route/*.*', angualrPlugin.in + 'angular-route/**/*'],
    out: dest + 'css/angularRoute'
};

var angularjsFile = {
    in: [source + 'angular-file-upload/*.*', angualrPlugin.in + 'angular-file-upload/**/*'],
    out: dest + 'css/angularFile'
};

// css source file: .scss files
var css = {
    in: source + 'css/main.scss',
    out: dest + 'css',
    watch: source + 'css/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + './assets/stylesheets']
    }
};

// boostrap.min.js
var bootMin = {
        in: [source + 'javascripts/*.*', bootstrapSass.in + 'assets/javascripts/**/*'],
        out: dest + 'css/boostrap'
    };

gulp.task('bootstrap', function () {
return gulp
    .src(bootMin.in)
    .pipe(gulp.dest(bootMin.out));
});

gulp.task('jquery', function () {
return gulp
    .src(jry.in)
    .pipe(gulp.dest(jry.out));
});

gulp.task('anguljs', function(){
    return gulp
    .src(angularjs.in)
     .pipe(gulp.dest(angularjs.out));
});

gulp.task('angularjsRt', function(){
    return gulp
    .src(angularjsRoute.in)
     .pipe(gulp.dest(angularjsRoute.out));
});

gulp.task('angularjsFls', function(){
    return gulp
    .src(angularjsFile.in)
     .pipe(gulp.dest(angularjsFile.out));
});

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', ['fonts'], function () {
return gulp.src(css.in)
    .pipe(plumber())
    .pipe(sass(css.sassOpts))
    .pipe(gulp.dest(css.out));
});

// default task
gulp.task('default', ['sass'], function () {
     gulp.watch(css.watch, ['sass']);
});