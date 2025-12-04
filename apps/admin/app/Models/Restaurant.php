<?php

namespace App\Models;

use Filament\Models\Contracts\HasAvatar;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Restaurant extends Model implements HasAvatar
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'latitude',
        'longitude',
        'logo_path',
        'phone',
        'ville',
        'email',
        'whatsapp_number',
        'opening_hours',
        'accept_order',
        'status',
    ];

    protected $casts = [
        'opening_hours' => 'array',
        'status' => 'string',
    ];
    protected $attributes = [
        'opening_hours' => '[]', 
    ];

     public function getFilamentAvatarUrl(): ?string
    {
        if($this->logo_path){
            return  Storage::url($this->logo_path);
        }

        $initial = strtoupper(substr($this->name,0,1));
        return "https://ui-avatars.com/api/?name={$initial}&background=000&color=fff&size=128";
    }

    
    public function subscription()
    {
        return $this->hasOne(Subscription::class)->where('status', 'active');
    }

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
