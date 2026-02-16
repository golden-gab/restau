<?php

namespace App\Providers\Filament;

use App\Filament\Pages\Auth\EditProfile;
use App\Filament\Restaurateur\Pages\Dashboard;
// use App\Filament\Pages\Dashboard;
use App\Filament\Restaurateur\Pages\EditRestaurantProfile;
use App\Filament\Restaurateur\Pages\RegisterRestaurant;
use App\Filament\Restaurateur\Pages\Settings;
use App\Models\Restaurant;
use Filament\Actions\Action;
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
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;

class RestaurateurPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('restaurateur')
            ->path('restaurateur')
            ->login()
            ->passwordReset()
            ->colors([
                'danger' => Color::Rose,
                'gray' => Color::Gray,
                'info' => Color::Blue,
                'primary' => '#D45C3A',
                'success' => Color::Emerald,
                'warning' => Color::Orange,
            ])
            // ->userMenuItems([
            //     Action::make('settings')
            //         ->url(fn(): string => Settings::getUrl())
            //         ->icon('heroicon-o-cog-6-tooth'),
            //     // ...
            // ])

            // ->profile(EditProfile::class)
            ->discoverResources(in: app_path('Filament/Restaurateur/Resources'), for: 'App\Filament\Restaurateur\Resources')
            ->discoverPages(in: app_path('Filament/Restaurateur/Pages'), for: 'App\Filament\Restaurateur\Pages')
            ->pages([
                Dashboard::class,
                Settings::class,
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
            ->renderHook(
                PanelsRenderHook::USER_MENU_BEFORE,
                fn(): string => Blade::render('<livewire:tutorial-button />')
            )
            ->brandLogo(asset('images/logo2.png')) 
            ->favicon(asset('images/favicon.ico'))
            ->brandLogoHeight('2rem');
    }
}
