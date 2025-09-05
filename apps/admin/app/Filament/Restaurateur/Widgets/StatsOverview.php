<?php

namespace App\Filament\Restaurateur\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Commandes totales', '245')
                ->description('15% d\'augmentation vs mois dernier')
                ->chart([120, 140, 160, 180, 200, 220, 245])
                ->color('success')
                ->descriptionIcon('heroicon-m-arrow-trending-up'),

            // Indicateur opérationnel : commandes
            Stat::make('Commandes aujourd\'hui', '23')
                ->description('Moyenne journalière : 18 commandes')
                ->chart([15, 18, 22, 16, 20, 25, 23])
                ->color('info')
                ->descriptionIcon('heroicon-m-shopping-bag'),

            // Indicateur de croissance : nouveaux clients
            Stat::make('Nouveaux clients cette semaine', '8')
                ->description('Taux de fidélisation : 67%')
                ->chart([3, 5, 2, 6, 4, 8, 7])
                ->color('success')
                ->descriptionIcon('heroicon-m-user-plus'),
        ];
    }
}
