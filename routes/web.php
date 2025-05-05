<?php

use App\Http\Controllers\Auth\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', [HomeController::class, 'index'])->name('home');

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

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/categories', [ProductController::class, 'getProductsWithCategories'])->name('product.categories');


    Route::prefix('recipe')->group(function () {
        Route::get('/', [RecipeController::class, 'index'])->name('recipes.index');
        Route::get('/create', [RecipeController::class, 'create'])->name('recipe.create');
        Route::get('/{id}', [RecipeController::class, 'show'])->name('recipe.show');
        Route::post('/store', [RecipeController::class, 'store'])->name('recipe.store');
    });

});

require __DIR__.'/auth.php';
