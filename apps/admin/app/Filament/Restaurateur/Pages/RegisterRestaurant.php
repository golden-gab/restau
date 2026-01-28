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
        $data['user_id'] = Auth::user()->id;
        // $data['owner_id'] = auth()->user()->id;
        $data['slug'] = Str::slug($data['name']);
        $data['status'] = 'active';
        $data['opening_hours'] = [
            ['day' => 'Lundi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
            ['day' => 'Mardi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
            ['day' => 'Mercredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
            ['day' => 'Jeudi', 'opens_at' => '09:00', 'closes_at' => '22:00'],
            ['day' => 'Vendredi', 'opens_at' => '09:00', 'closes_at' => '22:00'],
            ['day' => 'Samedi', 'opens_at' => '10:00', 'closes_at' => '23:00'],
            ['day' => 'Dimanche', 'opens_at' => null, 'closes_at' => null], // fermé
        ];
        return Restaurant::create($data);
    }
}
