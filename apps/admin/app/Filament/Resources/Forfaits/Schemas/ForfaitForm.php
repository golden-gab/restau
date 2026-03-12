<?php

namespace App\Filament\Resources\Forfaits\Schemas;

// use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class ForfaitForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Grid::make(2)->schema([

                    TextInput::make('name')
                        ->label('Nom du forfait')
                        ->required()
                        ->maxLength(255),

                    Select::make('billing_cycle')
                        ->label('Cycle de facturation')
                        ->options([
                            'monthly' => 'Mensuel',
                            'yearly' => 'Annuel',
                        ])
                        ->required(),

                    TextInput::make('price')
                        ->label('Prix')
                        ->numeric()
                        ->prefix('FCFA')
                        ->default(0)
                        ->required(),

                    Toggle::make('is_active')
                        ->label('Forfait actif')
                        ->default(true),

                    TextInput::make('max_menu_items')
                        ->label('Nombre maximum de plats')
                        ->numeric()
                        ->helperText('Laisser vide pour illimité'),

                    TextInput::make('max_orders_per_month')
                        ->label('Commandes maximum par mois')
                        ->numeric()
                        ->helperText('Laisser vide pour illimité'),

                ]),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(3)
                    ->columnSpanFull(),

                Repeater::make('features')
                    ->label('Fonctionnalités')
                    ->schema([
                        TextInput::make('feature')
                            ->label('Fonctionnalité')
                            ->required(),
                    ])
                    ->addActionLabel('Ajouter une fonctionnalité')
                    ->columnSpanFull(),

            ]);
    }
}