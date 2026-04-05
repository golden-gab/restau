<?php
declare(strict_types=1);
namespace App\ApiResource;

class FeedRestaurantDto
{
    public ?int    $id   = null;
    public ?string $name = null;
    public ?string $slug = null;
    public ?string $logo = null;
}