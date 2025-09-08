<?php

namespace App\Filament\Restaurateur\Resources\Plats\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\TextSize;

class PlatInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informations du plat')
                    ->description('Détails sur ce plat ')
                    ->columns(2)
                    ->columnSpanFull()
                    ->schema([
                        Section::make()
                            ->columns(1)
                            ->schema([
                                TextEntry::make('name')
                                    ->label('Nom du plat')
                                    ->weight('bold')
                                    ->size(TextSize::Large),

                                TextEntry::make('categorie.designation')
                                    ->label('Catégorie')
                                    ->columnSpanFull(),

                                TextEntry::make('price')
                                    ->label('Prix')
                                    ->money('XAF')
                                    ->color('primary')
                                    ->weight('medium'),

                                IconEntry::make('is_available')
                                    ->label('Disponible')
                                    ->boolean()
                                    ->trueIcon('heroicon-m-check-circle')
                                    ->falseIcon('heroicon-m-x-circle')
                                    ->trueColor('success')
                                    ->falseColor('danger'),

                                TextEntry::make('description')
                                    ->label('Description')
                                    ->columnSpanFull()
                                    ->placeholder('Aucune description'),
                            ])
                            ->columnSpan(1),

                        // 📌 Colonne droite (image)
                        Section::make()
                            ->schema([
                                ImageEntry::make('image_path')
                                    ->label('Image du plat')
                                    ->disk('public')
                                    ->imageHeight(300)
                                    ->square()
                                    ->extraAttributes(['class' => 'rounded-lg shadow']),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }
}
