<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ActorsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $user = new UserController();
    return $user->create();
});
Route::get('/register', function () {
    $user = new UserController();
    return $user->create();
});
Route::post('/register', function (Request $request) {
    $user = new UserController();
    return $user->store($request);
});

Route::get('/actors', function () {
    $actors = new ActorsController();
    return $actors->create();
});
Route::get('/actors/data', function (Request $request) {
    $actors = new ActorsController();
    return $actors->index($request);
});