<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    use HasFactory;

    protected $fillable = [
        'designation',
    ];

    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class, 'speciality_restaurants')
            ->withTimestamps();
    }
}
