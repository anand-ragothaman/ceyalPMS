<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::controller(AuthController::class)
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::post('/register', 'register')->name('register');
        Route::post('/login', 'login')->name('login');
        Route::post('/logout', 'logout')->name('logout')->middleware('auth:sanctum');
    });


Route::middleware('auth:sanctum')->group(function () {
    Route::controller(ProfileController::class)
        ->prefix('profile')
        ->name('profile.')
        ->group(function () {
            Route::get('/get-profile', 'get_profile')->name('get_profile');
        });

    Route::controller(ProcessController::class)
        ->prefix('process')
        ->name('process.')
        ->group(function () {
            Route::get('/all-stages', 'all_stages')->name('all_stages');
            Route::post('/add-stage', 'add_stage')->name('add_stage');
            Route::get('/get-stage/{id}', 'get_stage')->name('get_stage');
            Route::put('/edit-stage', 'edit_stage')->name('edit_stage');
            Route::delete('/delete-stage', 'delete_stage')->name('delete_stage');

            Route::get('/all-processes', 'all_processes')->name('all_processes');
            Route::post('/add-process', 'add_process')->name('add_process');
            Route::get('/get-process/{id}', 'get_process')->name('get_process');
            Route::put('/edit-process', 'edit_process')->name('edit_process');
            Route::delete('/delete-process', 'delete_process')->name('delete_process');
        });
});
