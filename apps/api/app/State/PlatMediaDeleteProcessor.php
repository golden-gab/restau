<?php
declare(strict_types=1);
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Models\PlatMedia;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class PlatMediaDeleteProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): null
    {
        $media = PlatMedia::where('id', $uriVariables['id'])
            ->where('plat_id', $uriVariables['plat_id'])
            ->first();

        if (!$media) {
            throw new NotFoundHttpException('Média introuvable.');
        }

        Storage::disk('s3')->delete($media->s3_key);
        $media->delete();

        return null;
    }
}