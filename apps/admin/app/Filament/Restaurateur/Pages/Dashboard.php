<?php

namespace App\Filament\Restaurateur\Pages;

use App\Filament\Restaurateur\Widgets\BestPlats;
use App\Filament\Restaurateur\Widgets\OrderChart;
use App\Filament\Restaurateur\Widgets\QuickActions;
use App\Filament\Restaurateur\Widgets\StatsOverview;
use App\Filament\Restaurateur\Widgets\WorstPlats;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    
    // protected static string $view = 'filament.pages.dashboard';
    public function getWidgets(): array
    {
        return [
            QuickActions::class,
            StatsOverview::class,
            BestPlats::class,
            // ApplicationsTrendChart::class,
            WorstPlats::class,
            // OrderChart::class,
        ];
    }

} 
