<?php
declare(strict_types=1);
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\PlatMediaConfirmInput;
use App\ApiResource\PlatMediaDto;
use App\Models\PlatMedia;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class PlatMediaConfirmProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): PlatMediaDto
    {
        /** @var PlatMediaConfirmInput $data */
        $media = PlatMedia::where('id', $uriVariables['id'])
            ->where('plat_id', $uriVariables['plat_id'])
            ->where('status', 'pending')
            ->first();

        if (!$media) {
            throw new NotFoundHttpException('Média introuvable ou déjà confirmé.');
        }

        $media->update([
            'status'   => 'uploaded',
            'duration' => $data->duration,
        ]);

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