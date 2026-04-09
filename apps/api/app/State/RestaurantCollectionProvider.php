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
        if (empty($context['filters']['name'])) {
            $context['filters']['latitude'] = ['exists' => true];
            $context['filters']['longitude'] = ['exists' => true];
        }

        return $this->collectionProvider->provide($operation, $uriVariables, $context);

    }
}
