<?php

namespace Database\Factories;

use App\Models\Forfait;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForfaitFactory extends Factory
{
    protected $model = Forfait::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word() . ' Plan',
            'description' => $this->faker->optional()->sentence(12),
            'price' => $this->faker->randomFloat(2, 5, 500), // entre 5.00 et 500.00
            'billing_cycle' => $this->faker->randomElement(['monthly', 'yearly']),
            'features' => json_encode([
                'Support 24/7',
                'Dashboard Analytics',
                'Paiement en ligne',
                $this->faker->boolean() ? 'Marketing par email' : 'Gestion avancée',
            ]),
            'max_menu_items' => $this->faker->optional()->numberBetween(10, 200),
            'max_orders_per_month' => $this->faker->optional()->numberBetween(100, 10000),
            'is_active' => true, 
        ];
    }
}
