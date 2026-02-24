<?php

namespace App\Filament\Restaurateur\Resources\Accompagnements;

use App\Filament\Restaurateur\Resources\Accompagnements\Pages\ManageAccompagnements;
use App\Models\Accompagnement;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AccompagnementResource extends Resource
{
    protected static ?string $model = Accompagnement::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSparkles;
    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'designation';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('designation')
                    ->required(),
                // TextInput::make('restaurant_id')
                //     ->required()
                //     ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('designation')
            ->columns([
                TextColumn::make('designation')
                    ->searchable(),
                // TextColumn::make('restaurant_id')
                //     ->numeric()
                //     ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageAccompagnements::route('/'),
        ];
    }
}
