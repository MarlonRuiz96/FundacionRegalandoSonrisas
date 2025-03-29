<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagosController;

Route::get('/pagos/moneda/gtq', [PagosController::class, 'totaldonadoenQ']);
Route::get('/pagos/moneda/usd', [PagosController::class, 'totaldonadoenUSD']);

Route::get('/pagos/validos', [PagosController::class, 'donacionesvalidas']);
Route::get('/pagos/pendientes', [PagosController::class, 'donacionespendientes']);
Route::get('/pagos/fallidas', [PagosController::class, 'donacionesfallidas']);

Route::get('/pagos/departamento', [PagosController::class, 'donacionespordepartamento']);

Route::get('/pagos/{id}', [PagosController::class, 'show']);
Route::post('/pagos', [PagosController::class, 'store']);
Route::put('/pagos/{id}', [PagosController::class, 'update']);
Route::delete('/pagos/{id}', [PagosController::class, 'destroy']);
Route::get('/pagos', [PagosController::class, 'index']);




