<?php

namespace App\Filament\Restaurateur\Widgets;

use App\Models\Plat;
use Filament\Facades\Filament;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class WorstPlats extends ChartWidget
{
    protected ?string $heading = 'Plats les moins commandés';

    protected ?string $maxHeight = '300px';
    
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $tenant = Filament::getTenant();
        $worstPlats = DB::table('commande_plat')
            ->join('commandes', 'commande_plat.commande_id', '=', 'commandes.id')
            ->join('plats', 'commande_plat.plat_id', '=', 'plats.id')
            ->where('commandes.restaurant_id', $tenant->id)
            ->select(
                'plats.name',
                'plats.id',
                DB::raw('SUM(commande_plat.quantite) as total_quantite')
            )
            ->groupBy('plats.id', 'plats.name')
            ->orderBy('total_quantite', 'asc')
            ->limit(5)
            ->get();

        if ($worstPlats->isEmpty()) {
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
                    'data' => $worstPlats->pluck('total_quantite')->toArray(),
                    'backgroundColor' => [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                ],
            ],
            'labels' => $worstPlats->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
