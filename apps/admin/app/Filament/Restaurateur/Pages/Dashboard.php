<?php

namespace App\Filament\Pages;

use App\Filament\Restaurateur\Widgets\BestPlats;
use App\Filament\Restaurateur\Widgets\OrderChart;
use App\Filament\Restaurateur\Widgets\StatsOverview;
use App\Filament\Restaurateur\Widgets\WorstPlats;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public function getWidgets(): array
    {
        return [
            StatsOverview::class,
            BestPlats::class,
            // ApplicationsTrendChart::class,
            WorstPlats::class,
            // OrderChart::class,
        ];
    }
} 
