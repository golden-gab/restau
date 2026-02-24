<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations:[],
    normalizationContext: ['groups' => ['accompagnemnt:read']]
)]

#[ApiProperty(serialize: new Groups([ 'restaurant:plat:accompagnement:read','accompagnemnt:read']), property: 'id')]
#[ApiProperty(serialize: new Groups([ 'restaurant:plat:accompagnement:read','accompagnemnt:read']), property: 'designation')]

class Accompagnement extends Model
{
    protected $fillable = [
        'designation', 
    ];

    public function plats()
    {
        return $this->belongsToMany(Plat::class,  'accompagement_plats')
            ->withTimestamps();
    }
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}
