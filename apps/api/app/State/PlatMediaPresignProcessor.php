<?php
declare(strict_types=1);
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\PlatMediaPresignInput;
use App\ApiResource\PlatMediaPresignOutput;
use App\Models\PlatMedia;
use Aws\S3\S3Client;
use Illuminate\Support\Str;

final class PlatMediaPresignProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): PlatMediaPresignOutput
    {
        /** @var PlatMediaPresignInput $data */
        $platId = $uriVariables['plat_id'];

        $extension = match($data->mime_type) {
            'image/jpeg'      => 'jpg',
            'image/png'       => 'png',
            'image/webp'      => 'webp',
            'video/mp4'       => 'mp4',
            'video/quicktime' => 'mov',
        };

        $s3Key = "medias/plats/{$platId}/" . Str::uuid() . ".{$extension}";

        $media = PlatMedia::create([
            'plat_id'   => $platId,
            'type'      => $data->type,
            'status'    => 'pending',
            's3_key'    => $s3Key,
            'mime_type' => $data->mime_type,
            'size'      => $data->size,
            'order'     => PlatMedia::where('plat_id', $platId)->count(),
        ]);

        $s3Client = new S3Client([
            'version'                 => 'latest',
            'region'                  => 'auto',
            'endpoint'                => config('filesystems.disks.s3.endpoint'),
            'use_path_style_endpoint' => true,
            'credentials' => [
                'key'    => config('filesystems.disks.s3.key'),
                'secret' => config('filesystems.disks.s3.secret'),
            ],
        ]);

        $presignedUrl = (string) $s3Client
            ->createPresignedRequest(
                $s3Client->getCommand('PutObject', [
                    'Bucket'      => config('filesystems.disks.s3.bucket'),
                    'Key'         => $s3Key,
                    'ContentType' => $data->mime_type,
                ]),
                '+15 minutes'
            )
            ->getUri();

        $output                = new PlatMediaPresignOutput();
        $output->media_id      = $media->id;
        $output->presigned_url = $presignedUrl;
        $output->s3_key        = $s3Key;

        return $output;
    }
}