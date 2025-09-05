<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RestaurantFactory extends Factory
{
    protected $model = Restaurant::class;

    public function definition(): array
    {
        $name = $this->faker->company();

        return [
            'user_id' => User::factory(), 
            'name' => $name,
            'slug' => Str::slug($name) . '-' . Str::random(5),
            'description' => $this->faker->optional()->paragraph(),
            'logo_path' => null,
            'phone' => $this->faker->optional()->phoneNumber(),
            'ville' => $this->faker->optional()->city(),
            'email' => $this->faker->unique()->safeEmail(),
            'whatsapp_number' => $this->faker->optional()->e164PhoneNumber(),
           'opening_hours' => [
                ['day' => 'Lundi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                ['day' => 'Mardi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                ['day' => 'Mercredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                ['day' => 'Jeudi', 'opens_at' => '09:00', 'closes_at' => '22:00'],
                ['day' => 'Vendredi', 'opens_at' => '09:00', 'closes_at' => '22:00'],
                ['day' => 'Samedi', 'opens_at' => '10:00', 'closes_at' => '23:00'],
                ['day' => 'Dimanche', 'opens_at' => null, 'closes_at' => null], // fermé
            ],
            'status' => $this->faker->randomElement(['active', 'inactive', 'suspended']),
        ];
    }
}
