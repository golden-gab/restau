<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class PlatMedia extends Model
{
    protected $fillable = [
        'plat_id', 'type', 'status', 's3_key',
        'thumbnail_key', 'mime_type', 'size', 'duration', 'order'
    ];

    protected $appends = ['url', 'thumbnail_url'];

    public function getUrlAttribute(): string
    {
        return Storage::disk('s3')->url($this->s3_key);
    }


    public function plat(): BelongsTo
    {
        return $this->belongsTo(Plat::class);
    }
}
