<?php
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\PlatMediaDto;
use App\Models\PlatMedia;
use Illuminate\Support\Facades\Storage;

final class PlatMediaCollectionProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array
    {
        return PlatMedia::where('plat_id', $uriVariables['plat_id'])
            ->where('status', 'uploaded')
            ->orderBy('order')
            ->get()
            ->map(fn ($media) => $this->toDto($media))
            ->toArray();
    }

    private function toDto(PlatMedia $media): PlatMediaDto
    {
        $dto           = new PlatMediaDto();
        $dto->id       = $media->id;
        $dto->plat_id  = $media->plat_id;
        $dto->type     = $media->type;
        $dto->status   = $media->status;
        $dto->url      = Storage::disk('s3')->url($media->s3_key);
        $dto->duration = $media->duration;
        $dto->order    = $media->order;

        return $dto;
    }
}