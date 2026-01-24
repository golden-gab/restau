<div>
    <!-- Bouton dans la toolbar -->
    <button 
        wire:click="openModal"
        type="button"
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
        title="Voir le guide"
    >
        {{-- <x-filament::icon 
            icon="heroicon-o-question-mark-circle" 
            class="w-5 h-5"
        /> --}}
        <span class="hidden sm:inline">Guide</span>
    </button>

    <!-- Modal Onboarding Plein Écran -->
    @if($showModal)
    <div 
        x-data="{ show: @entangle('showModal') }"
        x-show="show"
        x-cloak
        class="onboarding-modal"
    >
        <!-- Background avec gradient -->
        <div class="onboarding-background">
            <div class="onboarding-pattern"></div>
        </div>

        <!-- Bouton fermer -->
        <button 
            wire:click="closeModal"
            type="button"
            class="onboarding-close"
            title="Fermer"
        >
            <x-filament::icon 
                icon="heroicon-o-x-mark" 
                class="w-8 h-8"
            />
        </button>

        <!-- Contenu centré -->
        <div class="onboarding-container">
            <div class="onboarding-content">
                <!-- Indicateur de progression -->
                <div class="onboarding-progress-wrapper">
                    <div class="onboarding-progress-bar">
                        @foreach($steps as $index => $step)
                            <div class="onboarding-progress-step {{ $index > 0 ? 'ml' : '' }}">
                                <div class="onboarding-progress-fill {{ $index <= $currentStep ? 'active' : '' }}"></div>
                            </div>
                        @endforeach
                    </div>
                    <p class="onboarding-progress-text">
                        Étape {{ $currentStep + 1 }} sur {{ count($steps) }}
                    </p>
                </div>

                <!-- Contenu principal -->
                <div class="onboarding-main">
                    <!-- Icône -->
                    <div class="onboarding-icon-wrapper">
                        <x-filament::icon 
                            :icon="$steps[$currentStep]['icon']" 
                            class="onboarding-icon"
                        />
                    </div>
                    
                    <!-- Titre et description -->
                    <div class="onboarding-text-wrapper">
                        <h1 class="onboarding-title">
                            {{ $steps[$currentStep]['title'] }}
                        </h1>
                        <p class="onboarding-description">
                            {{ $steps[$currentStep]['description'] }}
                        </p>
                    </div>

                    <!-- Points de navigation -->
                    <div class="onboarding-dots">
                        @foreach($steps as $index => $step)
                            <button
                                wire:click="$set('currentStep', {{ $index }})"
                                class="onboarding-dot {{ $index === $currentStep ? 'active' : '' }}"
                                aria-label="Aller à l'étape {{ $index + 1 }}"
                            ></button>
                        @endforeach
                    </div>
                </div>

                <!-- Boutons d'action -->
                <div class="onboarding-actions">
                    <!-- Bouton Passer -->
                    

                    <!-- Boutons navigation -->
                    <div class="onboarding-nav-buttons">
                        @if($currentStep > 0)
                            <button
                                wire:click="previousStep"
                                type="button"
                                class="onboarding-btn onboarding-btn-secondary"
                            >
                                <x-filament::icon 
                                    icon="heroicon-m-arrow-left" 
                                    class="btn-icon"
                                />
                                Précédent
                            </button>
                        @endif

                        <button
                            wire:click="nextStep"
                            type="button"
                            class="onboarding-btn onboarding-btn-primary"
                        >
                            {{ $currentStep < count($steps) - 1 ? 'Suivant' : 'Commencer' }}
                            <x-filament::icon 
                                :icon="$currentStep < count($steps) - 1 ? 'heroicon-m-arrow-right' : 'heroicon-m-rocket-launch'" 
                                class="btn-icon"
                            />
                        </button>
                    </div>
                    <button
                        wire:click="skipOnboarding"
                        type="button"
                        class="onboarding-skip"
                    >
                        Passer le guide
                    </button>
                </div>
            </div>
        </div>
    </div>

    <style>
        [x-cloak] { 
            display: none !important; 
        }

        /* Modal plein écran */
        .onboarding-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            overflow-y: auto;
        }

        /* Background gradient */
        .onboarding-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        html.dark .onboarding-background {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        }

        /* Pattern overlay */
        .onboarding-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
            background-size: 40px 40px;
        }

        /* Bouton fermer */
        .onboarding-close {
            position: absolute;
            top: 24px;
            right: 24px;
            z-index: 10;
            color: white;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .onboarding-close:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }

        /* Container centré */
        .onboarding-container {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px 16px;
        }

        /* Contenu principal */
        .onboarding-content {
            width: 100%;
            max-width: 1000px;
            animation: fadeInUp 0.5s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Barre de progression */
        .onboarding-progress-wrapper {
            margin-bottom: 48px;
        }

        .onboarding-progress-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .onboarding-progress-step {
            flex: 1;
        }

        .onboarding-progress-step.ml {
            margin-left: 12px;
        }

        .onboarding-progress-fill {
            height: 6px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.3);
            transition: all 0.4s ease;
        }

        .onboarding-progress-fill.active {
            background: white;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .onboarding-progress-text {
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin: 0;
        }

        /* Contenu principal */
        .onboarding-main {
            text-align: center;
            padding: 0 16px;
        }

        /* Icône */
        .onboarding-icon-wrapper {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 128px;
            height: 128px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            margin: 0 auto 32px;
            transition: transform 0.3s ease;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        .onboarding-icon {
            width: 64px;
            height: 64px;
            color: white;
        }

        /* Texte */
        .onboarding-text-wrapper {
            max-width: 800px;
            margin: 0 auto;
        }

        .onboarding-title {
            font-size: 48px;
            font-weight: 700;
            color: white;
            margin: 0 0 24px 0;
            line-height: 1.2;
        }

        .onboarding-description {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Points de navigation */
        .onboarding-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 48px;
        }

        .onboarding-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;
        }

        .onboarding-dot:hover {
            background: rgba(255, 255, 255, 0.6);
            transform: scale(1.2);
        }

        .onboarding-dot.active {
            width: 32px;
            border-radius: 5px;
            background: white;
        }

        /* Actions */
        .onboarding-actions {
            margin-top: 64px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }

        .onboarding-skip {
            order: 2;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            padding: 12px 24px;
            transition: color 0.3s ease;
        }

        .onboarding-skip:hover {
            color: white;
        }

        /* Boutons de navigation */
        .onboarding-nav-buttons {
            order: 1;
            display: flex;
            gap: 12px;
        }

        .onboarding-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .onboarding-btn .btn-icon {
            width: 20px;
            height: 20px;
        }

        .onboarding-btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .onboarding-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .onboarding-btn-primary {
            background: white;
            color: #667eea;
        }

        .onboarding-btn-primary:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
        }

        /* Responsive */
        @media (min-width: 640px) {
            .onboarding-container {
                padding: 64px 32px;
            }

            .onboarding-actions {
                flex-direction: column-reverse;
                justify-content: center;
            }

            .onboarding-skip {
                order: 1;
            }

            .onboarding-nav-buttons {
                order: 2;
            }
        }

        @media (max-width: 640px) {
            .onboarding-title {
                font-size: 32px;
            }

            .onboarding-description {
                font-size: 16px;
            }

            .onboarding-icon-wrapper {
                width: 96px;
                height: 96px;
            }

            .onboarding-icon {
                width: 48px;
                height: 48px;
            }
        }
    </style>
    @endif
</div>