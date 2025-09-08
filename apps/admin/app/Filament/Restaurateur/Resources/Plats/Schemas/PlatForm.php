<?php

namespace App\Filament\Restaurateur\Resources\Plats\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PlatForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informations du plat')
                    ->columns(1)
                    ->columnSpanFull()
                    ->schema([
                        // FileUpload::make('image_path')
                        //     ->label('Image du plat')
                        //     ->image()
                        //     ->maxSize(2048)
                        //     ->nullable()
                        // ->disk('public'),
                        FileUpload::make('image_path')
                            ->label('Image du plat')
                            ->image()
                            ->directory('restaurants/plats')
                            ->disk('public')
                            ->visibility('public')

                            // ->avatar()
                            // ->acceptedFileTypes(['image/png', 'image/jpeg', 'image/webp'])
                            ->maxSize(2048)
                            ->nullable()
                            ->helperText('Format accepté : JPG, PNG, WebP. Taille max : 2MB'),

                        Select::make('categorie_id')
                            ->relationship('categorie', 'designation')
                            ->searchable()
                            ->preload()
                            ->required(),
                        TextInput::make('name')
                            ->label('Nom du plat')
                            ->required(),
                        Textarea::make('description')
                            ->columnSpanFull(),
                        TextInput::make('price')
                            ->label('Prix')
                            ->required()
                            ->numeric()
                            ->prefix('FCFA'),
                        Toggle::make('is_available')
                            ->label('disponible')
                            ->required(),
                    ]),

            ]);
    }
}
