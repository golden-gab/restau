<?php

namespace App\Filament\Resources\Forfaits\Pages;

use App\Filament\Resources\Forfaits\ForfaitResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListForfaits extends ListRecords
{
    protected static string $resource = ForfaitResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
