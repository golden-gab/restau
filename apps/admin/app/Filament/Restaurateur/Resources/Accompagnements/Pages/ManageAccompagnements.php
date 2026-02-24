<?php

namespace App\Filament\Restaurateur\Resources\Accompagnements\Pages;

use App\Filament\Restaurateur\Resources\Accompagnements\AccompagnementResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageAccompagnements extends ManageRecords
{
    protected static string $resource = AccompagnementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
