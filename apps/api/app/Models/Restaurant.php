<?php

namespace App\Models;

use ApiPlatform\Laravel\Eloquent\Filter\EqualsFilter;
use ApiPlatform\Laravel\Eloquent\Filter\PartialSearchFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\QueryParameter;
use App\State\RestaurantCollectionProvider;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            name: "get_restaurants",
            normalizationContext: ['groups' => ['restaurant:read']],
            provider: RestaurantCollectionProvider::class
        ),
        new Get(
            uriTemplate: '/restaurants/{slug}',
            // requirements: ['slug' => '[a-z0-9\-]+'],
            uriVariables: ['slug'],
            normalizationContext: ['groups' => ['restaurant:restaurant:read', 'restaurant:categorie:read', 'restaurant:plat:read', 'restaurant:plat:categorie:read']]
        ),
        new Post(denormalizationContext: ['groups' => ['restaurant:write']]),
    ]
)]

#[QueryParameter(key: 'status', filter: EqualsFilter::class, properties: ['status'])]
#[QueryParameter(key: 'name', filter: PartialSearchFilter::class, properties: ['name'])]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read']), property: 'id')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read', 'restaurant:write', 'restaurant:read']), property: 'name')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read', 'restaurant:write', 'restaurant:read']), property: 'description')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read', 'restaurant:read']), property: 'logo_path')]
#[ApiProperty(serialize: new Groups(['restaurant:read']), property: 'slug')]
#[ApiProperty(serialize: new Groups(['restaurant:read']), property: 'latitude')]
#[ApiProperty(serialize: new Groups(['restaurant:read']), property: 'longitude')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read']), property: 'ville')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read']), property: 'email')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read']), property: 'whatsapp_number')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read', 'restaurant:read']), property: 'phone')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read', 'restaurant:read']), property: 'status')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read']), property: 'accept_order')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:read']), property: 'opening_hours')]
#[ApiProperty(serialize: new Groups(['restaurant:categorie:read']), property: 'categories')]
#[ApiProperty(serialize: new Groups(['restaurant:plat:read', 'restaurant:plat:categorie:read']), property: 'plats')]

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'latitude',
        'longitude',
        'logo_path',
        'phone',
        'ville',
        'email',
        'whatsapp_number',
        'opening_hours',
        'accept_order',
        'status',
    ];

    protected $casts = [
        'opening_hours' => 'array',
        'status' => 'string',
    ];
    protected $attributes = [
        'opening_hours' => '[]',
    ];

    public function subscription()
    {
        return $this->hasOne(Subscription::class)->where('status', 'active');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plats()
    {
        return $this->hasMany(Plat::class);
    }

    public function categories()
    {
        return $this->hasMany(Categorie::class);
    }
}
