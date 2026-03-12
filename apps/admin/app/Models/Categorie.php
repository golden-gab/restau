<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categorie extends Model
{
   use HasFactory,SoftDeletes;

    protected $fillable = [
        'restaurant_id',
        'designation',
        'description',
    ];

    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function plats(): HasMany
    {
        return $this->hasMany(Plat::class);
    }
}
