<?php

declare(strict_types=1);

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Models\Restaurant;

final class OnlineRestaurantsProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        return Restaurant::whereNull('latitude')
                ->whereNull('longitude')
                ->get();
    }
}
