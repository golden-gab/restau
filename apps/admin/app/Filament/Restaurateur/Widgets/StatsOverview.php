<?php

namespace App\Filament\Restaurateur\Widgets;

use App\Models\Commande;
use Filament\Facades\Filament;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;
    protected function getStats(): array
    {
        $tenant = Filament::getTenant();
        if (!$tenant) {
            return [];
        }

        $totalCommandes = Commande::where('restaurant_id', $tenant->id)->count();
        $commandesDuJour = Commande::where('restaurant_id', $tenant->id)
            ->whereDate('created_at', today())
            ->count();
        $commandesDuMois = Commande::where('restaurant_id', $tenant->id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
            
        return [
            Stat::make('Commandes totales', $totalCommandes)
                 ->description('Total des commandes passées')
                 ->chart([75, 50, 100, 125, 110, 175])
                 ->color('primary')
                 ->descriptionIcon('heroicon-m-shopping-cart'),

            // Indicateur opérationnel : commandes
            Stat::make('Commandes du jour', $commandesDuJour)
                 ->description('Commandes passées aujourd\'hui')
                 ->chart([5, 10, 8, 12, 15, 10])
                 ->color('warning')
                 ->descriptionIcon('heroicon-m-clock'),

            // Indicateur de croissance : nouveaux clients
            Stat::make('Clients de ce mois', $commandesDuMois)
                 ->description('Commandes passées ce mois-ci')
                 ->chart([10, 20, 15, 25, 30, 20])
                 ->color('success')
                 ->descriptionIcon('heroicon-m-user-group'),
        ];
    }
}
