<?php

namespace App\Filament\Restaurateur\Widgets;

use App\Models\Plat;
use Filament\Facades\Filament;
use Filament\Widgets\ChartWidget;

class BestPlats extends ChartWidget
{
    protected ?string $heading = 'Plats les plus commandés';
    
    protected ?string $maxHeight = '300px';
    
    protected static ?int $sort = 3;

    protected function getData(): array
    {

        $tenant = Filament::getTenant();

        $bestPlats = Plat::select('plats.id', 'plats.name')
            ->join('commande_plat', 'plats.id', '=', 'commande_plat.plat_id')
            ->join('commandes', 'commande_plat.commande_id', '=', 'commandes.id')
            ->where('commandes.restaurant_id', $tenant->id)
            ->selectRaw('SUM(commande_plat.quantite) as total_vendu')
            ->selectRaw('COUNT(DISTINCT commandes.id) as nb_commandes')
            ->groupBy('plats.id', 'plats.name')
            ->orderByDesc('total_vendu')
            ->limit(5)
            ->get();

        if ($bestPlats->isEmpty()) {
            return [
                'datasets' => [
                    [
                        'data' => [1],
                        'backgroundColor' => ['#e5e7eb'],
                    ]
                ],
                'labels' => ['Aucune donnée']
            ];
        }
        return [
            'datasets' => [
                [
                    'label' => 'Articles vendus',
                    'data' => $bestPlats->pluck('total_vendu')->toArray(),
                    'backgroundColor' => [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                ],
            ],
            'labels' => $bestPlats->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
