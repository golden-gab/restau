<?php

namespace Database\Seeders;

use App\Models\Forfait;
use App\Models\Restaurant;
use App\Models\Role;
use App\Models\Speciality;
use App\Models\Subscription;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::create(['designation' => 'admin']);
        Role::create(['designation' => 'restaurateur']);

        // User::factory(10)->create();
        // Speciality::factory(5)->create();
        // // Forfait::factory(3)->create();
        // Restaurant::factory(10)->create();
        // Subscription::factory(10)->create();

        User::create([
            'name' => "Goldengab",
            'email' => "contact@golden-gab.com",
            'email_verified_at' => now(),
            'role_id' => 1,
            'password' => Hash::make('password'),
        ]);

        Forfait::create([
            'name' => 'Plan Standard',
            'description' => 'Une formule simple et efficace pour digitaliser votre restaurant et gérer vos commandes en toute sérénité.',
            'price' => 0,
            'billing_cycle' => 'monthly',
            'features' => [
                ['feature' => 'Création de menus en ligne attractifs'],
                ['feature' => 'Réception des commandes via WhatsApp'],
                ['feature' => 'Gestion facile des plats et catégories'],
                ['feature' => 'Statistiques de ventes simplifiées'],
                ['feature' => 'Assistance disponible en cas de besoin'],
            ],
            'max_menu_items' => 50,
            'max_orders_per_month' => 500,
            'is_active' => true,
        ]);

        Speciality::create(['designation' => 'Pâtisserie']);
        Speciality::create(['designation' => 'Bar']);
        Speciality::create(['designation' => 'Fast Food']);
        Speciality::create(['designation' => 'Cuisine Locale']);
        Speciality::create(['designation' => 'Fruits de Mer']);
        Speciality::create(['designation' => 'Glacier']);
    }
}
