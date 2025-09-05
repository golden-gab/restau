<?php

namespace Database\Factories;

use App\Models\Subscription;
use App\Models\Restaurant;
use App\Models\Forfait;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    protected $model = Subscription::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 month', 'now');
        $end = (clone $start)->modify('+1 month');

        return [
            'restaurant_id' => Restaurant::factory(),
            'forfait_id' => Forfait::factory(),
            'status' => $this->faker->randomElement(['active', 'cancelled', 'expired', 'trial']),
            'starts_at' => $start,
            'ends_at' => $end,
            'trial_ends_at' => $this->faker->boolean(30) ? (clone $start)->modify('+7 days') : null,
        ];
    }
}
