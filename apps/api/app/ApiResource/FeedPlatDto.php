<?php
declare(strict_types=1);
namespace App\ApiResource;

class FeedPlatDto
{
    public ?int    $id         = null;
    public ?string $name       = null;
    public ?float  $price      = null;
    public ?string $image_url  = null; // image_path du plat (fallback poster)
}