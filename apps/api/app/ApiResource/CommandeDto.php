<?php
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\State\CommandeProcessor;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/commandes',
            denormalizationContext: ['groups' => ['commande:write']],
            processor: CommandeProcessor::class
        )
    ]
)]
class CommandeDto{
    public ?int $id = null;

    // #[Groups(['commande:write'])]
    // public ?string $nom_client = null;

    // #[Groups(['commande:write'])]
    // public ?string $telephone_client = null;

    // #[Groups(['commande:write'])]
    // public ?string $notes = null;

    // #[Groups(['commande:write'])]
    // public ?string $statut = null;

    #[Groups(['commande:write'])]
    public ?int $restaurant_id = null;

    #[Groups(['commande:write'])]
    public ?array $plats = null;
}