<?php

namespace App\Filament\Restaurateur\Pages;

use Filament\Actions\Action;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Pages\Page;
use Filament\Pages\Tenancy\EditTenantProfile;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Facades\Storage;

class EditRestaurantProfile extends EditTenantProfile
{
    public static function getLabel(): string
    {
        return 'Profil du restaurant';
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Informations du restaurant')
                // ->columns(2)
                ->schema([
                    FileUpload::make('banniere')
                        ->label('Bannière du restaurant')
                        ->directory('restaurants/bannieres')
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

                    FileUpload::make('logo_path')
                        ->label('Logo du restaurant')
                        ->image()
                        ->directory('restaurants/logos')
                        ->disk('public')
                        ->visibility('public')
                        ->avatar()
                        ->maxSize(2048)
                        ->nullable()
                        ->helperText('Format accepté : JPG, PNG, WebP. Taille max : 2MB')
                        ->deleteUploadedFileUsing(function ($file) {
                            // Supprimer l’ancien fichier
                            Storage::disk('public')->delete($file);
                        }),

                    TextInput::make('name')
                        ->label('Nom du restaurant')
                        ->required()
                        ->maxLength(255),

                    Textarea::make('description')
                        ->label('Description')
                        ->nullable(),

                    CheckboxList::make('specialities')
                        ->relationship(titleAttribute: 'designation')
                        ->columns(3)
                        ->label("Spécialités du restaurant"),

                    Toggle::make('accept_order')
                        ->label('Accepter les livraison')
                        ->required(),
                ]),
            Section::make('Localisation du restaurant')
                ->schema([

                    TextInput::make('ville')
                        ->label('Ville')
                        ->nullable(),

                    TextInput::make('latitude')
                        ->label('Latitude')
                        ->numeric()
                        ->placeholder('Ex: 4.0511')
                        ->reactive()
                        ->nullable(),
                    TextInput::make('longitude')
                        ->label('Longitude')
                        ->numeric()
                        ->placeholder('Ex: 9.7679')
                        ->reactive()
                        ->nullable(),

                    Action::make('get_location')
                        ->label('Utiliser ma position actuelle')
                        ->color('primary')
                        ->size('sm')
                        ->outlined()
                        ->action(fn() => null)
                        ->extraAttributes([
                            'x-data' => '{}',
                            'x-on:click.prevent' => "
                                navigator.geolocation.getCurrentPosition((position) => {
                                    console.log(position);
                                    \$wire.fillLocation(position.coords.latitude, position.coords.longitude);
                                },
                                (error) => {
                                    console.error(error);
                                    alert(error.code + ' - ' + error.message);
                                },
                                {
                                    enableHighAccuracy: true,
                                    timeout: 10000,
                                    maximumAge: 0
                                }
                            );
                            ",
                        ])
                ]),
            Section::make('Contact du restaurant')
                // ->columns(2)
                ->schema([
                    TextInput::make('phone')
                        ->label('Téléphone')
                        ->nullable(),

                    TextInput::make('email')
                        ->label('Email')
                        ->email()
                        ->nullable(),

                    TextInput::make('whatsapp_number')
                        ->label('Numéro WhatsApp')
                        ->tel()
                        ->placeholder('+237 600 00 00 00')
                        ->nullable(),
                ]),

            Section::make("Horaires du restaurant")
                // ->columns(2)
                ->schema([
                    Repeater::make('opening_hours')
                        ->label("Jours de la semaine")
                        ->schema([
                            TextInput::make('day')
                                ->label('Jour')
                                ->readOnly(), // Important pour sauvegarder la valeur
                            TimePicker::make('opens_at')
                                ->label('Ouvre à')
                                ->seconds(false),
                            TimePicker::make('closes_at')
                                ->label('Ferme à')
                                ->seconds(false),
                        ])
                        ->defaultItems(7)
                        ->columns(3)
                        ->addable(false)
                        ->deletable(false)
                        // ->itemLabel(fn(array $state): ?string => $state['day'] ?? null)
                        ->nullable(),
                ]),

        ]);
    }
    public function fillLocation($latitude, $longitude)
    {
        // Récupère les valeurs actuelles du formulaire
        $data = $this->form->getState();

        // Fusionne avec les nouvelles coordonnées
        $data = array_merge($data, [
            'latitude' => $latitude,
            'longitude' => $longitude,
        ]);

        // Remplit le formulaire avec toutes les données
        $this->form->fill($data);
    }
}
