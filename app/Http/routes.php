<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/v1', function() {
  return view('template/index');
});

Route::post('/v1', function() {
  $url = Request::input('url');
  return view('v1/index', ['content' => $url]);
});

Route::get("/phpinfo", function() {
	phpinfo();
});

Route::get("/user", function() {
	$users = User::all();
	dd($users);
});