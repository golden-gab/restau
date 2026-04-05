<?php
namespace App\ApiResource;

use Symfony\Component\Validator\Constraints as Assert;

class PlatMediaPresignInput
{
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['photo', 'video'])]
    public string $type;

    #[Assert\NotBlank]
    #[Assert\Choice(choices: [
        'image/jpeg', 'image/png', 'image/webp',
        'video/mp4', 'video/quicktime'
    ])]
    public string $mime_type;

    #[Assert\NotBlank]
    #[Assert\LessThanOrEqual(104857600)] // 100 Mo max
    public int $size;
}