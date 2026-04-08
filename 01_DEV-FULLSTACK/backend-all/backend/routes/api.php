<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\IntakeController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\SummaryController;
use App\Http\Controllers\Api\MLProxyController;

/*
|--------------------------------------------------------------------------
| Public Routes (Bisa diakses tanpa login)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Wajib pakai Bearer Token / Login)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth & Profile
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Makanan (CRUD & List)
    Route::get('/foods', [FoodController::class, 'index']);
    Route::post('/foods', [FoodController::class, 'store']);
    Route::get('/foods/{food}', [FoodController::class, 'show']);
    
    // Catatan Makan (Intake)
    Route::post('/intakes', [IntakeController::class, 'store']);
    
    // Aktivitas & Olahraga
    Route::get('/activities', [ActivityController::class, 'index']);
    Route::post('/activities/record', [ActivityController::class, 'store']);
    
    // Dashboard & Grafik
    Route::get('/dashboard', [SummaryController::class, 'getDashboardData']);
    
    // Machine Learning Proxy
    Route::post('/ml/predict-burn', [MLProxyController::class, 'predictBurn']);
});