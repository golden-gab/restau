<?php

namespace App\Filament\Widgets;

use App\Models\Commande;
use App\Models\Restaurant;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    
    protected static ?int $sort = 1;
    
    protected function getStats(): array
    {
        
        return [
            Stat::make('Utilisateurs', User::count())
                ->description('Total des utilisateurs')
                ->chart([75, 50, 100, 125, 110, 175])
                ->color('primary')
                ->descriptionIcon('heroicon-m-user-group'),

            Stat::make('Restaurants', Restaurant::where('status','active')->count())
                ->description('Total des restaurants actifs')
                ->chart([5, 10, 8, 12, 15, 10])
                ->color('success')
                ->descriptionIcon('heroicon-m-building-storefront'),

            Stat::make('Commandes', Commande::count())
                ->description('Total des commandes passées')
                ->chart([20, 25, 30, 28, 35, 40])
                ->color('warning')
                ->descriptionIcon('heroicon-m-shopping-cart'),
        ];
    }
}
