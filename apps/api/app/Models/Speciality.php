<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['speciality:read']]
)]

#[ApiProperty(serialize: new Groups(['restaurant:restaurant:speciality:read', 'restaurant:speciality:read','speciality:read']), property: 'id')]
#[ApiProperty(serialize: new Groups(['restaurant:restaurant:speciality:read', 'restaurant:speciality:read','speciality:read']), property: 'designation')]

class Speciality extends Model
{
    use HasFactory,SoftDeletes;

     protected $fillable = ['designation'];

    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class, 'speciality_restaurants')
            ->withTimestamps();
    }
}
