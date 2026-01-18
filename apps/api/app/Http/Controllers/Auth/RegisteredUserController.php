<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Restaurant;
use App\Models\Subscription;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'restoName' => ['required', 'string', 'max:255'],
            'restoDescription' => ['nullable', 'string'],
            'ville' => ['nullable', 'string'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],  // ✅ Changé
            'longitude' => ['nullable', 'numeric', 'between:-180,180'], // ✅ Changé
            'openingHours' => ['nullable', 'array'],
            'openingHours.*.day' => ['string'], // ✅ Validation des éléments
            'openingHours.*.opens_at' => ['nullable', 'string'],
            'openingHours.*.closes_at' => ['nullable', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'min:8'],
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $request->restoName, // Use restaurant name as user name
                'role_id' => 2,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $restaurant = Restaurant::create([
                'user_id' => $user->id,
                'name' => $request->restoName,
                'slug' => Str::slug($request->restoName) . '-' . Str::random(5),
                'description' => $request->restoDescription,
                'ville' => $request->ville ?? null,
                'latitude' => $request->latitude ?? null,
                'longitude' => $request->longitude ?? null,
                'opening_hours' => $request->openingHours ?? [
                    ['day' => 'Lundi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                    ['day' => 'Mardi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                    ['day' => 'Mercredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                    ['day' => 'Jeudi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                    ['day' => 'Vendredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                    ['day' => 'Samedi', 'opens_at' => '10:00', 'closes_at' => '23:00'],
                    ['day' => 'Dimanche', 'opens_at' => null, 'closes_at' => null], // fermé
                ],
            ]);

            $subscription = Subscription::create([
                'restaurant_id' => $restaurant->id,
                'forfait_id' => 1,
            ]);

            event(new Registered($user));
            // Auth::login($user);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Registration successful',
                'user' => $user,
                'restaurant' => $restaurant,
                'subscription' => $subscription
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
