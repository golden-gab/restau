<?php

namespace App\Filament\Resources\Forfaits;

use App\Filament\Resources\Forfaits\Pages\CreateForfait;
use App\Filament\Resources\Forfaits\Pages\EditForfait;
use App\Filament\Resources\Forfaits\Pages\ListForfaits;
use App\Filament\Resources\Forfaits\Schemas\ForfaitForm;
use App\Filament\Resources\Forfaits\Tables\ForfaitsTable;
use App\Models\Forfait;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ForfaitResource extends Resource
{
    protected static ?string $model = Forfait::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return ForfaitForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ForfaitsTable::configure($table);
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
            'index' => ListForfaits::route('/'),
            'create' => CreateForfait::route('/create'),
            'edit' => EditForfait::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
