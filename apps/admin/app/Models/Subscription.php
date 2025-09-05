<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'restaurant_id',
        'forfait_id',
        'status',
        'starts_at',
        'ends_at',
        'trial_ends_at',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function forfait()
    {
        return $this->belongsTo(Forfait::class);
    }
}
