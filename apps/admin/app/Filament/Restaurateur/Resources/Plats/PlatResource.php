<?php

namespace App\Filament\Restaurateur\Resources\Plats;

use App\Filament\Restaurateur\Resources\Plats\Pages\CreatePlat;
use App\Filament\Restaurateur\Resources\Plats\Pages\EditPlat;
use App\Filament\Restaurateur\Resources\Plats\Pages\ListPlats;
use App\Filament\Restaurateur\Resources\Plats\Pages\ViewPlat;
use App\Filament\Restaurateur\Resources\Plats\Schemas\PlatForm;
use App\Filament\Restaurateur\Resources\Plats\Schemas\PlatInfolist;
use App\Filament\Restaurateur\Resources\Plats\Tables\PlatsTable;
use App\Models\Plat;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PlatResource extends Resource
{
    protected static ?string $model = Plat::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?int $navigationSort = 4;
    
    public static function form(Schema $schema): Schema
    {
        return PlatForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PlatInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PlatsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPlats::route('/'),
            'create' => CreatePlat::route('/create'),
            'view' => ViewPlat::route('/{record}'),
            'edit' => EditPlat::route('/{record}/edit'),
        ];
    }
}
