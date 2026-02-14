<x-filament-panels::page>
    {{ $this->form }}
    <div wire:loading wire:target="fillLocation">
        Localisation en cours...
    </div>
    {{-- {!! $geolocationScript !!} --}}
</x-filament-panels::page>