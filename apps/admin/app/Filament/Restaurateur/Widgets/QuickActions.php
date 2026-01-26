<?php

namespace App\Filament\Restaurateur\Widgets;

use App\Models\Categorie;
use App\Models\Plat;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class QuickActions extends StatsOverviewWidget
{
    protected ?string $heading = 'Actions Rapides';
    protected static ?int $sort = 1;


    protected function getStats(): array
    {
        $restaurant = filament()->getTenant();
        $fields = [
            'name' => $restaurant->name,
            'description' => $restaurant->description,
            'logo' => $restaurant->logo_path,
            'phone' => $restaurant->phone,
            'whatsapp' => $restaurant->whatsapp_number,
            'ville' => $restaurant->ville,
            'opening_hours' => $restaurant->opening_hours,
            'location' => $restaurant->latitude && $restaurant->longitude,
        ];

        $completed = collect($fields)->filter()->count();
        $total = count($fields);

        $percentage = round(($completed / $total) * 100);

        return [
            Stat::make('Catégories de plats', Categorie::count())
                ->description('Créer une nouvelle catégorie')
                ->descriptionIcon('heroicon-m-plus-circle') // Ajoute un petit plus pour l'action
                ->url($restaurant->slug . '/categories')
                ->icon('heroicon-o-rectangle-stack') // L'icône principale
                ->color('success'),

            Stat::make('Nombre de plats', Plat::count())
                ->description('Créer un nouveau plat')
                ->descriptionIcon('heroicon-m-plus-circle')
                ->url($restaurant->slug . '/plats/create')
                ->icon('heroicon-o-cake') // L'icône principale
                ->color('success'),


            Stat::make('Profil du restaurant', $percentage . '%')
                ->description(
                    $percentage < 100
                        ? 'Complétez votre profil pour être visible'
                        : 'Profil complet et prêt'
                )
                ->icon('heroicon-o-user-circle')
                ->url($restaurant->slug . '/profile')
                ->color(
                    match (true) {
                        $percentage < 50 => 'danger',
                        $percentage < 100 => 'warning',
                        default => 'success',
                    }
                ),
        ];
    }
}
