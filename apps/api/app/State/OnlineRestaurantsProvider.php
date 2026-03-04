<?php

declare(strict_types=1);

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Models\Restaurant;
use App\Services\GeocodingService;

final class OnlineRestaurantsProvider implements ProviderInterface
{
    public function __construct(protected GeocodingService $geocoding)
    {
    }
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {

        $city = $this->geocoding->getCityFromCoordinates(
            (double) $context['filters']['latitude'],
            (double) $context['filters']['longitude']
        );
        if (!$city) {
            return response()->json(['message' => 'Ville introuvable'], 422);
        }

        $restaurants = Restaurant::with('specialities')->whereNotNull('ville')
            ->whereNull('latitude') // confirme que c'est bien numérique
            ->whereRaw('? LIKE CONCAT("%", ville, "%")', [$city])
            ->get();

        return response()->json([
            'ville' => $city,
            'restaurants' => $restaurants,
        ]);
    }
}
