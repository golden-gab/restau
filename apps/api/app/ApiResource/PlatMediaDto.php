<?php
declare(strict_types=1);
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\State\PlatMediaCollectionProvider;
use App\State\PlatMediaConfirmProcessor;
use App\State\PlatMediaDeleteProcessor;
use App\State\PlatMediaPresignProcessor;

#[ApiResource(
    operations: [

        new GetCollection(
            uriTemplate: '/plats/{plat_id}/medias',
            provider: PlatMediaCollectionProvider::class,
        ),

        new Post(
            uriTemplate: '/plats/{plat_id}/medias/presign',
            input: PlatMediaPresignInput::class,
            output: PlatMediaPresignOutput::class,
            processor: PlatMediaPresignProcessor::class,
        ),

        new Post(
            uriTemplate: '/plats/{plat_id}/medias/{id}/confirm',
            input: PlatMediaConfirmInput::class,
            output: PlatMediaDto::class,
            processor: PlatMediaConfirmProcessor::class,
        ),

        new Delete(
            uriTemplate: '/plats/{plat_id}/medias/{id}',
            processor: PlatMediaDeleteProcessor::class,
        ),
    ]
)]
class PlatMediaDto
{
    public ?int    $id       = null;
    public ?int    $plat_id  = null;
    public ?string $type     = null;   // photo | video
    public ?string $status   = null;   // pending | uploaded
    public ?string $url      = null;
    public ?int    $duration = null;
    public ?int    $order    = null;
}