<?php

namespace App\Filament\Restaurateur\Resources\Plats\Pages;

use App\Filament\Restaurateur\Resources\Plats\PlatResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPlats extends ListRecords
{
    protected static string $resource = PlatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
