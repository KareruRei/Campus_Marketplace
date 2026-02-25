<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Models\StudentRegistry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        // 1. Combine first_name + last_name into full name
        $fullName = trim($validated['first_name'] . ' ' . $validated['last_name']);

        // 2. Add student to student_registry if not already there (FK requirement)
        //    If they already exist in the registry, this is a no-op.
        StudentRegistry::updateOrCreate(
            ['student_id' => $validated['student_id']],
            [
                'full_name' => $fullName,
                'email'     => $validated['email'],
            ]
        );

        // 3. Create User account
        //    (RegisterRequest already validates unique:users,student_id and unique:users,email
        //     so if they already registered, they get "This student ID is already registered.")
        $user = User::create([
            'student_id' => $validated['student_id'],
            'name'       => $fullName,
            'email'      => $validated['email'],
            'password'   => $validated['password'],
            'phone'      => $request->phone,
            'role'       => 'user',
        ]);

        // 4. Return Sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'role' => $user->role,
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($user->is_banned) {
            return response()->json(['message' => 'Your account has been banned.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'role' => $user->role,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
