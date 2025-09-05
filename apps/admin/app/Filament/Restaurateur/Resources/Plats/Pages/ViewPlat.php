<?php

namespace App\Filament\Restaurateur\Resources\Plats\Pages;

use App\Filament\Restaurateur\Resources\Plats\PlatResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPlat extends ViewRecord
{
    protected static string $resource = PlatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
