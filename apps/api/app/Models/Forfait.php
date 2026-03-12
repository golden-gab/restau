<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Forfait extends Model
{
    use HasFactory,SoftDeletes;
    
    protected $fillable = [
        'name',
        'description',
        'price',
        'billing_cycle',
        'features',
        'max_menu_items',
        'max_orders_per_month',
        'is_active',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
