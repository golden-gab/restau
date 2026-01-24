<?php

namespace App\Livewire;

use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class TutorialButton extends Component
{
    public bool $showModal = false;
    public int $currentStep = 0;

    public array $steps = [
        [
            'title' => 'Bienvenue sur Mealop ! 👋',
            'description' => 'Créez votre menu en ligne en quelques minutes et commencez à recevoir des commandes via WhatsApp.',
            'icon' => 'heroicon-o-hand-raised',
        ],
        [
            'title' => 'Étape 1 : Créez vos catégories',
            'description' => 'Avant d\'ajouter vos plats, créez d\'abord vos catégories (Entrées, Plats principaux, Desserts, Boissons, etc.). C\'est essentiel pour organiser votre menu !',
            'icon' => 'heroicon-o-folder-plus',
        ],
        [
            'title' => 'Étape 2 : Ajoutez vos plats',
            'description' => 'Une fois vos catégories créées, ajoutez vos plats avec photos, descriptions et prix. Vos clients pourront les consulter en ligne.',
            'icon' => 'heroicon-o-shopping-bag',
        ],
        [
            'title' => 'Étape 3 : Personnalisez votre restaurant',
            'description' => 'Ajoutez votre logo, vos horaires d\'ouverture et vos informations de contact dans le profil du restaurant pour rendre votre menu unique.',
            'icon' => 'heroicon-o-paint-brush',
        ],
        [
            'title' => 'Étape 4 : Partagez votre menu',
            'description' => 'Récupérez votre lien unique et partagez-le sur vos réseaux sociaux. Vos clients pourront commander directement via WhatsApp !',
            'icon' => 'heroicon-o-share',
        ],
        [
            'title' => 'C\'est parti ! 🚀',
            'description' => 'Vous êtes prêt à gérer vos commandes et développer votre activité. Bonne réussite !',
            'icon' => 'heroicon-o-rocket-launch',
        ],
    ];
    public function mount()
    {
        // Vérifier si l'utilisateur a déjà vu l'onboarding
        if (!Auth::user()->has_seen_tutorial) {
            $this->showModal = true;
        }
    }

    public function openModal()
    {
        $this->showModal = true;
        $this->currentStep = 0;
    }
    public function closeModal()
    {
        $this->showModal = false;
        $this->markAsCompleted();
    }

    public function nextStep()
    {
        if ($this->currentStep < count($this->steps) - 1) {
            $this->currentStep++;
        } else {
            $this->closeModal();
        }
    }

    public function previousStep()
    {
        if ($this->currentStep > 0) {
            $this->currentStep--;
        }
    }
    public function skipOnboarding()
    {
        $this->closeModal();
        Notification::make()
            ->title('Onboarding ignoré')
            ->body('Vous pouvez toujours y accéder via le bouton en haut.')
            ->info()
            ->send();
    }

    private function markAsCompleted()
    {
        /** @var User $user */
        $user = Auth::user();

        if ($user) {
            $user->has_seen_tutorial = true;
            $user->save();
        }
    }
    public function render()
    {
        return view('livewire.tutorial-button');
    }
}
