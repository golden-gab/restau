<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Plat extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'restaurant_id',
        'categorie_id',
        'name',
        'description',
        'price',
        'image_path',
        'is_available',
        'available_days'
    ];

    protected $casts = [
        'available_days' => 'array',
    ];
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image_path) {
            return null;
        }

        return url(Storage::disk('public')->path($this->image_path));
    }
    public function accompagnements()
    {
        return $this->belongsToMany(Accompagnement::class, 'accompagement_plats')
            ->withTimestamps();
    }
}
