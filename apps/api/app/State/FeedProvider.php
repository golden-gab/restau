<?php
declare(strict_types=1);
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
// use App\ApiResource\FeedDto;
use App\ApiResource\FeedDto;
use App\ApiResource\FeedItemDto;
use App\ApiResource\FeedPlatDto;
use App\ApiResource\FeedRestaurantDto;
use App\Models\PlatMedia;
use Illuminate\Support\Facades\Storage;

final class FeedProvider implements ProviderInterface
{
    private const PER_PAGE = 10;

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): FeedDto
    {
        // Récupérer la page depuis les query params
        $page = (int) ($context['filters']['page'] ?? 1);
        $page = max(1, $page);

        $query = PlatMedia::query()
            ->with([
                'plat:id,name,price,image_path,restaurant_id',
                'plat.restaurant:id,name,slug,logo',
            ])
            ->where('status', 'uploaded')
            // Uniquement les plats disponibles
            ->whereHas('plat', fn ($q) => $q->where('is_available', true))
            // Uniquement les restaurants actifs
            ->whereHas('plat.restaurant', fn ($q) => $q->where('is_active', true))
            ->orderByDesc('created_at'); // les plus récents en premier

        $total   = $query->count();
        $medias  = $query->forPage($page, self::PER_PAGE)->get();
        $hasMore = ($page * self::PER_PAGE) < $total;

        $dto       = new FeedDto();
        $dto->data = $medias->map(fn ($media) => $this->toFeedItem($media))->toArray();
        $dto->meta = [
            'current_page' => $page,
            'per_page'     => self::PER_PAGE,
            'total'        => $total,
            'has_more'     => $hasMore,
        ];

        return $dto;
    }

    private function toFeedItem(PlatMedia $media): FeedItemDto
    {
        $plat       = $media->plat;
        $restaurant = $plat->restaurant;

        // DTO Plat
        $platDto            = new FeedPlatDto();
        $platDto->id        = $plat->id;
        $platDto->name      = $plat->name;
        $platDto->price     = (float) $plat->price;
        $platDto->image_url = $plat->image_path
            ? Storage::url($plat->image_path)
            : null;

        // DTO Restaurant
        $restaurantDto       = new FeedRestaurantDto();
        $restaurantDto->id   = $restaurant->id;
        $restaurantDto->name = $restaurant->name;
        $restaurantDto->slug = $restaurant->slug;
        $restaurantDto->logo = $restaurant->logo
            ? Storage::url($restaurant->logo)
            : null;

        // DTO Feed Item
        $item             = new FeedItemDto();
        $item->media_id   = $media->id;
        $item->type       = $media->type;
        $item->url        = Storage::disk('s3')->url($media->s3_key);
        $item->duration   = $media->duration;
        $item->order      = $media->order;
        $item->plat       = $platDto;
        $item->restaurant = $restaurantDto;

        return $item;
    }
}