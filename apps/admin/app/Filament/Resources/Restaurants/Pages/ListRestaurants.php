<?php

namespace App\Filament\Resources\Restaurants\Pages;

use App\Filament\Resources\Restaurants\RestaurantResource;
use App\Models\Restaurant;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Builder;

class ListRestaurants extends ListRecords
{
    protected static string $resource = RestaurantResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // CreateAction::make(),
        ];
    }
    public function getTabs(): array 
    {
        return [
            'Tout' => Tab::make()->badge(Restaurant::count()),

            'Inactifs' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => $query->where('status', 'inactive'))
                ->badge(Restaurant::where('status', 'inactive')->count())
                ->badgeColor('warning'),

            'Actifs' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => $query->where('status', 'active'))
                ->badge(Restaurant::where('status', 'active')->count())
                ->badgeColor('success'),

            'Suspendus' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => $query->where('status', 'suspended'))
                ->badge(Restaurant::where('status', 'suspended')->count())
                ->badgeColor('danger'),
        ];
    }
}
