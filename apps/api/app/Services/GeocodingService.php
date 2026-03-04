<?php
// app/Services/GeocodingService.php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class GeocodingService
{
    public function getCityFromCoordinates(float $lat, float $lng): ?string
    {
        $cacheKey = "city_{$lat}_{$lng}";

        return Cache::remember($cacheKey, now()->addHours(24), function () use ($lat, $lng) {
            $response = Http::withHeaders([
                'User-Agent' => config('app.name') . '/1.0 (contact@mealop.com)', // OBLIGATOIRE pour Nominatim
                'Accept-Language' => 'fr',
            ])->get('https://nominatim.openstreetmap.org/reverse', [
                'lat'    => $lat,
                'lon'    => $lng,
                'format' => 'json',
                'zoom'   => 10, // niveau ville
            ]);

            if ($response->failed()) return null;

            $data = $response->json();

            // Nominatim retourne plusieurs niveaux : city > town > village > county
            return $data['address']['city']
                ?? $data['address']['town']
                ?? $data['address']['village']
                ?? $data['address']['county']
                ?? null;
        });
    }
}