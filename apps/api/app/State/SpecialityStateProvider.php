<?php

declare(strict_types=1);

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Models\Speciality;

final class SpecialityStateProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
       return Speciality::with(['restaurants' => function ($q) {
                    $q->whereNotNull('latitude')
                      ->whereNotNull('longitude');
                }])
                ->findOrFail($uriVariables['id']);

    }
}

