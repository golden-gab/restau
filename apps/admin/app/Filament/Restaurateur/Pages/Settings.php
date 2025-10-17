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
    protected static ?int $navigationSort = 4;
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
                    ->schema([
                        TextInput::make('name')
                            ->label('Nom')
                            ->maxLength(255),
                        
                        TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        
                        TextInput::make('password')
                            ->label('Nouveau mot de passe')
                            ->password()
                            ->revealable()
                            ->dehydrated(fn ($state) => filled($state))
                            ->nullable(),
                        
                        TextInput::make('password_confirmation')
                            ->label('Confirmer le mot de passe')
                            ->password()
                            ->revealable()
                            ->same('password')
                            ->dehydrated(false)
                            ->nullable(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Enregistrer')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();

        $user = User::find(Auth::id());

        $user->name = $data['name'];
        $user->email = $data['email'];

        if (filled($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        Notification::make()
            ->success()
            ->title('Paramètres enregistrés')
            ->body('Vos paramètres ont été mis à jour avec succès.')
            ->send();
    }

    public static function getNavigationLabel(): string
    {
        return 'Paramètres';
    }
}