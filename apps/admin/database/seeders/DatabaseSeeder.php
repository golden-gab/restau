<?php

namespace Database\Seeders;

use App\Models\Forfait;
use App\Models\Restaurant;
use App\Models\Role;
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
        User::factory(10)->create();
        // Forfait::factory(3)->create();
        Restaurant::factory(10)->create();
        Subscription::factory(10)->create();
        User::create([
            'name' => "Goldengab",
            'email' => "goldengab@gmail.com",
            'email_verified_at' => now(),
            'role_id' => 1,
            'password' => Hash::make('password'),
        ]);
    }
}
