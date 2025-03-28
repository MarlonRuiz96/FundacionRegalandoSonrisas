<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagosController;

Route::get('/pagos', [PagosController::class, 'index']);
Route::get('/pagos/{id}', [PagosController::class, 'show']);
Route::post('/pagos', [PagosController::class, 'store']);
Route::put('/pagos/{id}', [PagosController::class, 'update']);
Route::delete('/pagos/{id}', [PagosController::class, 'destroy']);
