<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    public const HOME = '/';

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //        if (app()->environment('production')) {
        //            URL::forceScheme('https');
        //        }

        Vite::prefetch(concurrency: 3);
    }
}
