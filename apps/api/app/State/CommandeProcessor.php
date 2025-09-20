<?php

declare(strict_types=1);

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\CommandeDto;
use App\Models\Commande;
use App\Models\Plat;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
 
final class CommandeProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        // Démarrer une transaction pour garantir l'atomicité
        return DB::transaction(function () use ($data, $operation, $uriVariables, $context) {
            
            // 1. Créer la commande principale
            $commande = new Commande();
            $commande->fill([
                'nom_client' => $data->nom_client ?? null,
                'telephone_client' => $data->telephone_client ?? null,
                'notes' => $data->notes ?? null,
                'restaurant_id' => $data->restaurant_id
            ]);
            $commande->save();

            // 2. Traiter les plats si présents dans les données
            if (isset($data->plats) && is_array($data->plats)) {
                $this->attachPlatsToCommande($commande, $data->plats);
            }

            // 4. Log pour debug
            Log::info('Commande créée', [
                'commande_id' => $commande->id,
                'plats_count' => count($data->plats ?? [])
            ]);
            $commandeDto = new CommandeDto();
            $commandeDto->id = $commande->id;
            $commandeDto->restaurant_id = $commande->restaurant_id;
            // $commandeDto->plats = $commande
            
            return $commandeDto;
        });
    }

    private function attachPlatsToCommande(Commande $commande, array $plats): void
    {
        foreach ($plats as $platData) {
            $plat = Plat::find($platData['platId']);
            if (!$plat) {
                continue;
            }

            // Attacher le plat avec les données pivot
            $commande->plats()->attach($plat->id, [
                'quantite' => $platData['quantite'],
                'restaurant_id' => $commande->restaurant_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
