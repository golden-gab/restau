<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'nom_client',
        'telephone_client',
        'notes',
        'statut',
    ];

    public function plats()
    {
        return $this->belongsToMany(Plat::class, 'commande_plat')
                    ->withPivot('quantite', 'options')
                    ->withTimestamps();
    }
}
