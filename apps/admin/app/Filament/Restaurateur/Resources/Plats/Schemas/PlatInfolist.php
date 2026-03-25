<?php

namespace App\Filament\Restaurateur\Resources\Plats\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
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
                    ->columns(1)
                    ->schema([
                        Section::make()
                            ->columns(2)
                            ->contained(false)
                            ->schema([

                                ImageEntry::make('image_path')
                                    ->label('Image du plat')
                                    ->disk('public')
                                    ->columnSpanFull()
                                    ->width("100%")
                                    // ->square()
                                    ->extraAttributes(['class' => 'rounded-lg shadow']),
                                TextEntry::make('name')
                                    ->label('Nom du plat')
                                    ->weight('bold')
                                    ->size(TextSize::Large),


                                TextEntry::make('price')
                                    ->label('Prix')
                                    ->money('XAF')
                                    ->color('primary')
                                    ->weight('medium')
                                    ->size(TextSize::Large),
                            ]),
                        Section::make()
                            ->columns(2)
                            ->contained(false)
                            ->schema([

                                TextEntry::make('categorie.designation')
                                    ->label('Catégorie')->badge(),
                                IconEntry::make('is_available')
                                    ->label('Statut de disponibilité')
                                    ->boolean()
                                    ->trueIcon('heroicon-m-check-badge')
                                    ->falseIcon('heroicon-m-x-circle')
                                    ->trueColor('success')
                                    ->falseColor('danger')
                                    ->formatStateUsing(fn(bool $state) => $state ? 'Disponible' : 'Indisponible'),
                            ]),

                    ])
                    ->columnSpan(1),
                Section::make('Informations supplémentaires')
                    ->description('Détails supplémentaires sur ce plat ')
                    ->columns(1)
                    ->schema([

                        TextEntry::make('description')
                            ->label('Description')
                            ->columnSpanFull()
                            ->placeholder('Aucune description'),

                        TextEntry::make('accompagnements')
                            ->label('Accompagnements')
                            ->badge()
                            ->color('gray')
                            ->emptyTooltip("Aucun accompagnement")
                            ->getStateUsing(fn($record) => $record->accompagnements->pluck('designation')),

                        TextEntry::make('available_days')
                            ->label('Jours de disponibilité')
                            ->badge()
                            ->color('info')
                            ->placeholder('Disponible tous les jours')
                            ->getStateUsing(fn($record) => $record->available_days ?? []),
                    ])
                    ->columnSpan(1),
            ]);
    }
}
