<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\State\CommandeProcessor;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate:"/commandes",
            denormalizationContext: ['groups' => ['commande:write']],
            processor: CommandeProcessor::class
        )
    ]
)]
#[ApiProperty(serialize: new Groups(['commande:write']), property: 'restaurant_id')]
// #[ApiProperty(serialize: new Groups(['commande:write']), property: 'plats')]

class Commande extends Model
{
    protected $fillable = [
        'restaurant_id',
        'nom_client',
        'telephone_client',
        'notes',
        'statut',
    ];

    public function plats()
    {
        return $this->belongsToMany(Plat::class, 'commande_plat')
            ->withPivot('quantite', 'options')
            ->withTimestamps();
    }
}
