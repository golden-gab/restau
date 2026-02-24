<?php

declare(strict_types=1);

namespace App\State;

use ApiPlatform\Laravel\Eloquent\State\CollectionProvider;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Models\Restaurant;

final class RestaurantCollectionProvider implements ProviderInterface
{
    public function __construct(
        private CollectionProvider $collectionProvider
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // On part sur la query de base
        $query = Restaurant::query();

        // Si on veut afficher les restaurants de la carte on suppose qu'on ne recherche pas
        if (empty($context['filters']['name'])) {
            $query->whereNotNull('latitude')
                    ->whereNotNull('longitude');
        }

        // appliquer filtres éventuels (status, name) passés dans l'URL
        if (!empty($context['filters']['status'])) {
            $query->where('status', $context['filters']['status']);
        }

        if (!empty($context['filters']['name'])) {
            $query->where('name', 'like', '%' . $context['filters']['name'] . '%');
        }

        return $query->get();

    }
}
