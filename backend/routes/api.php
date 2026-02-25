<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Routes (requires auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Marketplace / Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update_quantity']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    // Checkout
    Route::post('/checkout', [CheckoutController::class, 'process_checkout']);

    // Seller Listings
    Route::post('/listings', [ListingController::class, 'store']);
    Route::get('/my-listings', [ListingController::class, 'myListings']);
    Route::delete('/listings/{id}', [ListingController::class, 'destroy']);

    // Orders
    Route::get('/buyer/orders', [OrderController::class, 'buyerOrders']);
    Route::get('/seller/orders', [OrderController::class, 'sellerOrders']);
    Route::put('/orders/{id}/status', [OrderController::class, 'update_status']);

    /*
    |--------------------------------------------------------------------------
    | Admin Routes (requires admin middleware)
    |--------------------------------------------------------------------------
    */
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::get('/listings', [AdminController::class, 'listings']);
        Route::get('/reports', [AdminController::class, 'reports']);
        Route::put('/reports/{id}', [AdminController::class, 'updateReport']);
        Route::get('/logs', [AdminController::class, 'logs']);
        Route::delete('/listings/{id}', [AdminController::class, 'deleteListing']);
        Route::post('/ban/{id}', [AdminController::class, 'banUser']);
        Route::post('/unban/{id}', [AdminController::class, 'unbanUser']);
    });
});
