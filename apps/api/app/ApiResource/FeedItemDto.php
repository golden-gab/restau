<?php
declare(strict_types=1);
namespace App\ApiResource;

class FeedItemDto
{
    public ?int              $media_id   = null;
    public ?string           $type       = null; // photo | video
    public ?string           $url        = null;
    public ?int              $duration   = null;
    public ?int              $order      = null;
    public ?FeedPlatDto      $plat       = null;
    public ?FeedRestaurantDto $restaurant = null;
}