<?php

namespace App\Filament\Restaurateur\Pages;

use App\Models\User;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class Settings extends Page implements HasForms
{
    use InteractsWithForms;

    // protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::Cog6Tooth;

    protected string $view = 'filament.restaurateur.pages.settings';
    protected static ?int $navigationSort = 5;
    protected static ?string $title = 'Paramètres';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'name' => Auth::user()->name,
            'email' => Auth::user()->email,
        ]);
    }

    public function form(Schema  $form)
    {
        return $form
            ->schema([
                Section::make('Paramètres du compte')
                    ->icon('heroicon-m-user')
                    ->description('Modifiez vos informations personnelles.')
                    ->schema([
                        TextInput::make('name')
                            ->label('Nom')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('email')
                            ->label('Adresse email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),

                        Action::make('updateInfo')
                            ->label('Enregistrer')
                            ->color('primary')
                            ->icon('heroicon-m-user')
                            ->action(fn() => $this->updateInfo()),

                    ]),

                Section::make('Sécurité')
                    ->icon('heroicon-m-lock-closed')
                    ->description("Mettre à jour votre mot de passe.")
                    ->columns(2) 
                    ->schema([
                        TextInput::make('oldPassword')
                            ->label('Ancien mot de passe')
                            ->password()
                            ->revealable()
                            ->columnSpan(2)
                            ->required()
                            ->dehydrated(fn($state) => filled($state))
                            ->nullable(),

                        TextInput::make('password')
                            ->label('Nouveau mot de passe')
                            ->password()
                            ->revealable()
                            ->dehydrated(fn($state) => filled($state))
                            ->nullable(),

                        TextInput::make('password_confirmation')
                            ->label('Confirmer le mot de passe')
                            ->password()
                            ->revealable()
                            ->same('password')
                            ->dehydrated(false)
                            ->nullable(),

                        Action::make('updatePassword')
                            ->label('Modifier mon mot de passe')
                            ->icon('heroicon-m-key')
                            ->action(fn() => $this->updatePassword()),
                    ]),
            ])
            ->statePath('data');
    }

    public function updateInfo(): void
    {
        $user = Auth::user();
        $data = $this->form->getState();

        assert($user instanceof User);
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        Notification::make()
            ->success()
            ->title('Informations mises à jour')
            ->body('Vos informations ont été enregistrées.')
            ->send();
    }

    public function updatePassword(): void
    {
        $data = $this->form->getState();

        if (! Hash::check($data['oldPassword'] ?? '', Auth::user()->password)) {
            Notification::make()
                ->danger()
                ->title('Ancien mot de passe incorrect')
                ->body('Le mot de passe actuel ne correspond pas.')
                ->send();
            return;
        }

        if (!filled($data['password'])) {
            Notification::make()
                ->warning()
                ->title('Aucun mot de passe fourni')
                ->send();
            return;
        }

        $user = Auth::user();
        assert($user instanceof User);
        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        Notification::make()
            ->success()
            ->title('Mot de passe modifié')
            ->body('Votre mot de passe a été mis à jour avec succès.')
            ->send();

        $this->form->fill([
            'name' => Auth::user()->name,
            'email' => Auth::user()->email,
            'oldPassword' => '',
            'password' => '',
            'password_confirmation' => '',
        ]);
    }

    public static function getNavigationLabel(): string
    {
        return 'Paramètres';
    }
}
