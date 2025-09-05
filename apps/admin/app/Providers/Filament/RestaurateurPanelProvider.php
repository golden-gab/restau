<?php

namespace App\Providers\Filament;

use App\Filament\Pages\Dashboard;
use App\Filament\Restaurateur\Pages\EditRestaurantProfile;
use App\Filament\Restaurateur\Pages\RegisterRestaurant;
use App\Models\Restaurant;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
// use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Support\Colors\Color;

class RestaurateurPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('restaurateur')
            ->path('restaurateur')
            ->login()
            ->colors([
                'danger' => Color::Rose,
                'gray' => Color::Gray,
                'info' => Color::Blue,
                'primary' => '#D45C3A',
                'success' => Color::Emerald, 
                'warning' => Color::Orange,
            ])
            ->discoverResources(in: app_path('Filament/Restaurateur/Resources'), for: 'App\Filament\Restaurateur\Resources')
            ->discoverPages(in: app_path('Filament/Restaurateur/Pages'), for: 'App\Filament\Restaurateur\Pages')
            ->pages([
                Dashboard::class
                // Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Restaurateur/Widgets'), for: 'App\Filament\Restaurateur\Widgets')
            ->widgets([
                // AccountWidget::class,
                // FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->tenant(Restaurant::class, ownershipRelationship: 'restaurant', slugAttribute: 'slug')
            ->tenantRegistration(RegisterRestaurant::class)
            ->tenantProfile(EditRestaurantProfile::class)
           
        ;
    }
}
