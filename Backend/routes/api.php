<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagosController;

use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::get('/pago/exitoso', [PagosController::class, 'pagoExitoso']);


Route::get('/pagos/detalle/{referencia}', [PagosController::class, 'obtenerDonacionporReferencia']);

Route::get('/pago/pagoexitoso', [PagosController::class, 'pagoExitoso']);

Route::get('/pagos/moneda/gtq', [PagosController::class, 'totaldonadoenQ']);
Route::get('/pagos/moneda/usd', [PagosController::class, 'totaldonadoenUSD']);

Route::get('/pagos/validos', [PagosController::class, 'donacionesvalidas']);
Route::get('/pagos/pendientes', [PagosController::class, 'donacionespendientes']);
Route::get('/pagos/fallidas', [PagosController::class, 'donacionesfallidas']);

Route::get('/pagos/detalle/{id}', [PagosController::class, 'obtenerDetalleTransaccion']);


Route::get('/pagos/estatus/pendiente', [PagosController::class, 'obtenerTransaccionesPendientes']);

Route::put('/pagos/actualizar/pendiente', [PagosController::class, 'UpdateEstadopago']);


// routes/web.php


Route::get('/pagos/departamento', [PagosController::class, 'donacionespordepartamento']);

Route::get('/pagos/{id}', [PagosController::class, 'show']);
Route::post('/pagos', [PagosController::class, 'store']);
Route::put('/pagos/{id}', [PagosController::class, 'update']);
Route::delete('/pagos/{id}', [PagosController::class, 'destroy']);
Route::get('/pagos', [PagosController::class, 'index']);






