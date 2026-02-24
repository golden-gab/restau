<?php

namespace App\Filament\Restaurateur\Resources\Plats\Widgets;

use App\Models\Commande_plat;
use Filament\Resources\Pages\Concerns\InteractsWithRecord;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PlatStatsOverview extends StatsOverviewWidget
{
    use InteractsWithRecord; 
    protected function getStats(): array
    {
         $plat = $this->record; // plat courant (ViewPlat / EditPlat)
        $restaurantId = $plat->restaurant_id;

        // Total commandes du plat
        $totalCommandes = Commande_plat::where('plat_id', $plat->id)
            ->where('restaurant_id', $restaurantId)
            ->distinct('commande_id')
            ->count('commande_id');

        // Commandes du mois
        $commandesMois = Commande_plat::where('plat_id', $plat->id)
            ->where('restaurant_id', $restaurantId)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->distinct('commande_id')
            ->count('commande_id');

        // Commandes aujourd’hui
        $commandesJour = Commande_plat::where('plat_id', $plat->id)
            ->where('restaurant_id', $restaurantId)
            ->whereDate('created_at', today())
            ->distinct('commande_id')
            ->count('commande_id');

        return [
            Stat::make('Commandes totales', $totalCommandes)
                ->description('Depuis la création du plat')
                ->color('success'),

            Stat::make('Commandes du mois', $commandesMois)
                ->description(now()->translatedFormat('F Y'))
                ->color('info'),

            Stat::make('Commandes du jour', $commandesJour)
                ->description('Aujourd’hui')
                ->color('warning'),
        ];
    }
}
