<?php

namespace App\Filament\Widgets;

use App\Models\Restaurant;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class LatestRestaurants extends TableWidget
{
    protected static ?int $sort = 2;

    protected static ?string $heading = 'Derniers restaurants inscrits';

    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(fn(): Builder => Restaurant::orderBy('created_at', 'desc')->limit(10))
            ->columns([
                ImageColumn::make('logo_path')
                    ->disk('public')
                    ->label('Logo')
                    ->visibility('public')
                    ->imageWidth(40)
                    ->circular(),
                TextColumn::make('name')
                    ->label('Nom du restaurant')
                    ->searchable(),
                TextColumn::make('user.email')
                    ->label('Propriétaire')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('ville')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->recordActions([
                //
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    //
                ]),
            ]);
    }
}
