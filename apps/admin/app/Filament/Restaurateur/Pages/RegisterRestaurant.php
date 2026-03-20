<?php

namespace App\Filament\Restaurateur\Pages;

use App\Models\Restaurant;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Filament\Pages\Tenancy\RegisterTenant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RegisterRestaurant extends RegisterTenant
{
    public static function getLabel(): string
    {
        return 'Ajouter un autre restaurant';
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nom du restaurant')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->label('Description')
                    ->nullable(),

                // FileUpload::make('logo_path')
                //     ->label('Logo')
                //     ->image()
                //     ->directory('restaurants/logos')
                //     ->nullable()
                //     ->visibility('public'),

                // TextInput::make('phone')
                //     ->label('Téléphone')
                //     ->nullable(),

                // TextInput::make('email')
                //     ->label('Email')
                //     ->email()
                //     ->nullable(),

                // TextInput::make('address')
                //     ->label('Adresse')
                //     ->nullable(),

                // TextInput::make('whatsapp_number')
                //     ->label('Numéro WhatsApp')
                //     ->tel()
                //     ->placeholder('+237 6 12 34 56 78')
                //     ->nullable(),
                // ...
            ]);
    }

    protected function handleRegistration(array $data): Restaurant
    {
        $parts = array_filter([
            $data['name'],
            $data['ville'] ?? null,
        ]);
        $baseSlug = Str::slug(implode(' ', $parts));
        $slug = $baseSlug;
        $count = 1;

        while (Restaurant::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        $data['user_id'] = Auth::user()->id;
        $data['slug'] = $slug;
        $data['status'] = 'active';
        $data['opening_hours'] = [
            ['day' => 'Lundi', 'open' => '09:00', 'close' => '18:00'],
            ['day' => 'Mardi', 'open' => '09:00', 'close' => '18:00'],
            ['day' => 'Mercredi', 'open' => '09:00', 'close' => '18:00'],
            ['day' => 'Jeudi', 'open' => '09:00', 'close' => '22:00'],
            ['day' => 'Vendredi', 'open' => '09:00', 'close' => '22:00'],
            ['day' => 'Samedi', 'open' => '10:00', 'close' => '23:00'],
            ['day' => 'Dimanche', 'open' => null, 'close' => null],
        ];

        return Restaurant::create($data);
    }
}
