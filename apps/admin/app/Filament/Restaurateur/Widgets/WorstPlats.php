<?php

namespace App\Filament\Restaurateur\Widgets;

use Filament\Widgets\ChartWidget;

class WorstPlats extends ChartWidget
{
    protected ?string $heading = 'Plats les moins commandés';
    
    protected ?string $maxHeight = '300px';

     protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'My First Dataset',
                    'data' => [10, 25, 30],
                    'backgroundColor' => [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                    ],
                ],
            ],
            'labels' => ['Plat 1', 'Plat 2', 'Plat 3'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
