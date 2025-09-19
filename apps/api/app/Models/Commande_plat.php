<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Type\Integer;
use Symfony\Component\Serializer\Annotation\Groups;


// #[ApiResource(
//     operations:[
//         new Post(denormalizationContext: ['groups' => ['commande_plat:write']])
//     ]
// )]
// #[ApiProperty(serialize: new Groups(['commande_plat:write']), property: 'commande_id')]
// #[ApiProperty(serialize: new Groups(['commande_plat:write']), property: 'plat_id')]
// #[ApiProperty(serialize: new Groups(['commande_plat:write']), property: 'quantite')]

class Commande_plat extends Model
{
    public int $quantite ;

     protected $fillable = [
        'commande_id',
        'plat_id',
        'quantite',
        'options',
    ];

    protected $casts = [
        'quantite' => 'integer',
    ];
}
