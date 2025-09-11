<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: []
)]
#[ApiProperty(serialize: new Groups(['restaurant:plat:read']), property: 'id')]
#[ApiProperty(serialize: new Groups(['restaurant:plat:read']), property: 'name')]
#[ApiProperty(serialize: new Groups(['restaurant:plat:read']), property: 'description')]
#[ApiProperty(serialize: new Groups(['restaurant:plat:read']), property: 'price')]
#[ApiProperty(serialize: new Groups(['restaurant:plat:read']), property: 'image_path')]
#[ApiProperty(serialize: new Groups(['restaurant:plat:categorie:read']), property: 'categorie')]

class Plat extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'categorie_id',
        'name',
        'description',
        'price',
        'image_path',
        'is_available',
    ];

    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }
}
