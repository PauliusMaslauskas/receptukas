<?php

use App\Http\Controllers\Auth\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('carts.index');
        Route::get('/{id}', [CartController::class, 'show'])->name('cart.show');
        Route::post('/store', [CartController::class, 'store'])->name('cart.store');
        Route::delete('/destroy', [CartController::class, 'destroy'])->name('cart.destroy');
        Route::delete('remove-item', [CartController::class, 'removeCartItem'])->name('cart.removeCartItem');
    });

    Route::get('products-categories', [ProductController::class, 'getProductsWithCategories'])->name('products.categories');
    
});

require __DIR__ . '/auth.php';
