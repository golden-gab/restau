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
            // 'restoDescription' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'min:8'],
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $request->restoName, // Use restaurant name as user name
                'role_id' => 1,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $restaurant = Restaurant::create([
                'user_id' => $user->id,
                'name' => $request->restoName,
                'slug' => Str::slug($request->restoName) . '-' . Str::random(5),
                'description' => $request->restoDescription,
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