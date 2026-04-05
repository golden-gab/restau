<?php
declare(strict_types=1);
namespace App\ApiResource;

class PlatMediaConfirmInput
{
    public ?int $duration = null; // secondes, vidéos uniquement
}