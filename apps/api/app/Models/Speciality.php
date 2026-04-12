<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use App\State\SpecialityStateProvider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(

    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['speciality:read']]
        ),
        new Get(
            uriTemplate: '/speciality/{id}',
            uriVariables: [
                'id'
            ],
            provider:SpecialityStateProvider::class,
            normalizationContext: ['groups' => ['speciality:speciality:read','speciality:speciality:restaurant:read']]
        ),

    ]
)]


#[ApiProperty(serialize: new Groups(['restaurant:restaurant:speciality:read', 'restaurant:speciality:read', 'speciality:read','speciality:speciality:read']), property: 'id')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:speciality:read', 'restaurant:speciality:read', 'speciality:read','speciality:speciality:read']), property: 'designation')]
#[ApiProperty(serialize: new Groups(['speciality:speciality:restaurant:read']), property: 'restaurants')]
// #[ApiProperty(serialize: new Groups(['speciality:restaurant:read','speciality:read',]), property: 'onlineRestaurants')]

class Speciality extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['designation'];

    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class, 'speciality_restaurants')
            ->withTimestamps();
    }


}
