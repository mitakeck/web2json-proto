var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
 var paths = {
     'jquery': 'bower_components/jquery/',
     'bootstrap': 'bower_components/bootstrap-sass/assets/',
     'xdomainajax': 'bower_components/jquery.xdomainajax/'
 };

elixir(function(mix) {
  "use strict";
  mix.sass('app.scss')
  .copy(paths.bootstrap + 'fonts/bootstrap/**', 'public/fonts/bootstrap')
  .scripts([
    paths.jquery + 'dist/jquery.js',
    paths.bootstrap + 'javascripts/bootstrap.js',
    paths.xdomainajax + 'jquery.xdomainajax.js'
  ], 'public/js/app.js', './');
});
