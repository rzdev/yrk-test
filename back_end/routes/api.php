<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('books','BookController@getBooks');
Route::post('book/add','BookController@addBook');
Route::get('book/edit/{id}','BookController@editBook');
Route::post('book/edit','BookController@doEditBook');
Route::post('book/delete','BookController@deleteBook');
Route::post('export','BookController@doExport');