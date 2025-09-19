<?php

namespace App\Providers;

use App\State\CommandeProcessor;
use ApiPlatform\State\ProcessorInterface;
use App\State\RestaurantCollectionProvider;
use ApiPlatform\State\ProviderInterface;
use Illuminate\Auth\Notifications\ResetPassword;
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

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

		$this->app->tag(RestaurantCollectionProvider::class, ProviderInterface::class);

		$this->app->tag(CommandeProcessor::class, ProcessorInterface::class);
    }
}
