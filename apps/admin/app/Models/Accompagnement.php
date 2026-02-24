<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
