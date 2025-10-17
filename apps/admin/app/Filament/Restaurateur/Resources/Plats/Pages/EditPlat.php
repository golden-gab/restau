<?php

namespace App\Filament\Restaurateur\Resources\Plats\Pages;

use App\Filament\Restaurateur\Resources\Plats\PlatResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditPlat extends EditRecord
{
    protected static string $resource = PlatResource::class;
    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
