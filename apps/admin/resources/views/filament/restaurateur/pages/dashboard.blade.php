<x-filament-panels::page>
    <div>
        <h2 class="text-2xl font-bold">Tableau de bord</h2>
        <p class="mt-2 text-gray-600">Bienvenue dans votre espace de gestion!</p>
        
        <!-- Votre contenu du dashboard ici -->
    </div>

    <!-- Modal de tutoriel -->
    <div 
        x-data="tutorialModal()"
        x-init="$wire.on('open-tutorial-modal', () => { showModal = true })"
        x-show="showModal"
        x-cloak
        class="fixed inset-0 z-50 overflow-y-auto"
        style="display: none;"
    >
        <!-- Overlay -->
        <div 
            class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            x-show="showModal"
            x-transition:enter="ease-out duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="ease-in duration-200"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
        ></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
            <div 
                class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full"
                x-show="showModal"
                x-transition:enter="ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave="ease-in duration-200"
                x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                @click.away="skipTutorial()"
            >
                <!-- Header -->
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-gray-900">
                            Guide de démarrage rapide
                        </h3>
                        <button 
                            @click="skipTutorial()"
                            class="text-gray-400 hover:text-gray-600"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Progress indicator -->
                    <div class="mt-4">
                        <div class="flex justify-between mb-2">
                            <span class="text-sm text-gray-600">
                                Étape <span x-text="currentStep + 1"></span> sur <span x-text="totalSteps"></span>
                            </span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                :style="`width: ${((currentStep + 1) / totalSteps) * 100}%`"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="px-6 py-8">
                    <!-- Step 1: Bienvenue -->
                    <div x-show="currentStep === 0" class="text-center">
                        <div class="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>
                        <h4 class="text-2xl font-bold text-gray-900 mb-3">Bienvenue sur votre Dashboard!</h4>
                        <p class="text-gray-600 text-lg">
                            Nous allons vous montrer les fonctionnalités essentielles pour gérer votre restaurant en quelques étapes simples.
                        </p>
                    </div>

                    <!-- Step 2: Gestion du menu -->
                    <div x-show="currentStep === 1">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-gray-900 mb-2">1. Créez votre menu</h4>
                                <p class="text-gray-600 mb-4">
                                    Accédez à la section "Menu" dans la barre latérale pour ajouter vos plats.
                                </p>
                                <ul class="space-y-2 text-gray-600">
                                    <li class="flex items-center">
                                        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        Ajoutez nom, prix et description
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        Téléchargez des images appétissantes
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        Organisez par catégories
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Configuration WhatsApp -->
                    <div x-show="currentStep === 2">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-gray-900 mb-2">2. Configurez WhatsApp</h4>
                                <p class="text-gray-600 mb-4">
                                    Renseignez votre numéro WhatsApp dans les paramètres pour recevoir les commandes.
                                </p>
                                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                    <p class="text-sm text-purple-900 font-medium">💡 Astuce:</p>
                                    <p class="text-sm text-purple-800 mt-1">
                                        Utilisez un numéro professionnel pour séparer vos commandes de vos messages personnels.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Partagez votre menu -->
                    <div x-show="currentStep === 3">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-gray-900 mb-2">3. Partagez votre menu</h4>
                                <p class="text-gray-600 mb-4">
                                    Récupérez le lien de votre menu et partagez-le sur vos réseaux sociaux.
                                </p>
                                <div class="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
                                    https://votresaas.com/menu/votre-restaurant
                                </div>
                                <p class="text-sm text-gray-500 mt-2">
                                    ✓ Partagez sur Facebook, Instagram, WhatsApp Status
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Step 5: C'est parti! -->
                    <div x-show="currentStep === 4" class="text-center">
                        <div class="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h4 class="text-2xl font-bold text-gray-900 mb-3">Vous êtes prêt!</h4>
                        <p class="text-gray-600 text-lg mb-4">
                            Vous pouvez maintenant commencer à gérer votre restaurant et recevoir vos premières commandes.
                        </p>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                            <p class="text-sm text-blue-900 font-medium mb-2">📚 Besoin d'aide?</p>
                            <p class="text-sm text-blue-800">
                                Consultez notre documentation complète ou contactez notre support via le bouton d'aide en bas à droite.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Footer / Navigation -->
                <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center rounded-b-lg">
                    <button
                        x-show="currentStep > 0"
                        @click="previousStep()"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        ← Précédent
                    </button>
                    
                    <button
                        x-show="currentStep === 0"
                        @click="skipTutorial()"
                        class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                        Passer le tutoriel
                    </button>

                    <div class="flex space-x-3">
                        <button
                            x-show="currentStep < totalSteps - 1"
                            @click="nextStep()"
                            class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                        >
                            Suivant →
                        </button>
                        
                        <button
                            x-show="currentStep === totalSteps - 1"
                            @click="completeTutorial()"
                            class="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                        >
                            Commencer! 🚀
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @push('scripts')
    <script>
        function tutorialModal() {
            return {
                showModal: false,
                currentStep: 0,
                totalSteps: 5,
                
                nextStep() {
                    if (this.currentStep < this.totalSteps - 1) {
                        this.currentStep++;
                    }
                },
                
                previousStep() {
                    if (this.currentStep > 0) {
                        this.currentStep--;
                    }
                },
                
                skipTutorial() {
                    this.showModal = false;
                    this.$wire.call('markTutorialAsComplete');
                },
                
                completeTutorial() {
                    this.showModal = false;
                    this.$wire.call('markTutorialAsComplete');
                }
            }
        }
    </script>
    @endpush
</x-filament-panels::page>