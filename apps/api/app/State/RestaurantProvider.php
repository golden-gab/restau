<?php

declare(strict_types=1);

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Models\Restaurant;
use Carbon\Carbon;

final class RestaurantProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
       $jour = ucfirst(Carbon::now()->locale('fr')->dayName);

        $restaurant = Restaurant::with([
            'specialities',
            'categories',
            'plats' => function ($query) use ($jour) {
                $query->where('is_available', true)
                      ->where(function ($q) use ($jour) {
                          $q->whereNull('available_days')
                            ->orWhereJsonContains('available_days', $jour);
                      });
            },
            'plats.categorie',
            'plats.accompagnements',
        ])
        ->where('slug', $uriVariables['slug'])
        ->first();

        return $restaurant;
    }
}
