<?php

namespace App\Filament\Restaurateur\Resources\Plats\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PlatStatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
             Stat::make('Commandes totales', '245')
                ->description('Commandes depuis la création du restaurant')
                ->chart([3, 5, 2, 6, 4, 8, 7])
                ->color('success'),

            // Indicateur opérationnel : commandes
            Stat::make('Commandes du mois', '23')
                ->description('Moyenne journalière : 18 commandes')
                ->chart([15, 18, 22, 16, 20, 25, 23])
                ->color('info'),

            // Indicateur de croissance : nouveaux clients
           Stat::make('Commandes aujourd\'hui', '23')
                ->description('Lorem ipsum')
                ->chart([3, 5, 2, 6, 4, 8, 7])
                ->color('success'),
        ];
    }
} 
