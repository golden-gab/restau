<?php
declare(strict_types=1);
namespace App\ApiResource;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\FeedProvider;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/feed',
            output: FeedDto::class,
            provider: FeedProvider::class,
        ),
    ]
)]
class FeedDto
{
    public array $data = [];
    public array $meta = [];
}