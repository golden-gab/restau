<?php

namespace App\Filament\Restaurateur\Resources\Plats\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

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
                        FileUpload::make('image_path')
                            ->label('Image du plat')
                            ->directory('restaurants/plats')
                            ->image()
                            ->disk('public')
                            ->visibility('public')
                            ->maxSize(2048)
                            ->nullable()
                            ->helperText('Format accepté : JPG, PNG, WebP. Taille max : 2MB')
                            ->deleteUploadedFileUsing(function ($file) {
                                // Supprimer l’ancien fichier
                                Storage::disk('public')->delete($file);
                            }),
                        FileUpload::make('video_path')
                            ->label('Vidéo')
                            ->multiple() // Si tu veux plusieurs vidéos
                            ->nullable()
                            ->acceptedFileTypes(['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'])
                            ->maxSize(102400) // Taille max en KB (ici 100 MB)
                            ->disk('public') // Disk de stockage
                            ->directory('videos') // Dossier de destination
                            ->visibility('public'),
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

                        CheckboxList::make('accompagnements')
                            ->relationship(titleAttribute: 'designation')
                            ->columns(3)
                            ->label("Accompagnements"),

                        Toggle::make('is_available')
                            ->label('disponible')
                            ->required(),
                    ]),

            ]);
    }
}
