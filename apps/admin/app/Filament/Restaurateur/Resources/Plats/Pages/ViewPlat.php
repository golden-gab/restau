<?php

namespace App\Filament\Restaurateur\Resources\Plats\Pages;

use App\Filament\Restaurateur\Resources\Plats\PlatResource;
use App\Filament\Restaurateur\Resources\Plats\Widgets\PlatStatsOverview;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPlat extends ViewRecord
{
    protected static string $resource = PlatResource::class;
 
    public function getTitle(): string
    {
        return $this->record->name;
    }

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
    public function getHeaderWidgets(): array
    {
        return [
            PlatStatsOverview::class,
        ];
    }
}
