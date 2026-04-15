<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Mengubah base URL link reset password agar mengarah ke Frontend
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return env('FRONTEND_URL') . '/reset-password?token=' . $token . '&email=' . urlencode($user->email);
        });
    }
}
