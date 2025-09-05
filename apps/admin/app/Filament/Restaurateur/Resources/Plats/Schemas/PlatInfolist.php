<?php

namespace App\Filament\Restaurateur\Resources\Plats\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PlatInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('restaurant.name'),
                TextEntry::make('categorie.id'),
                TextEntry::make('name'),
                TextEntry::make('price')
                    ->money(),
                ImageEntry::make('image_path'),
                IconEntry::make('is_available')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
