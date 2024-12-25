<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            // 'confirm_password' => 'required|same:password',
        ]);
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();
        } catch (\Throwable $th) {
            return response([
                'message' => 'Something wrong, Train again later.'
            ], 422);
        }


        return response([
            'message' => 'Register successfully!'
        ], 201);
    }

    function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'Invalid credentials.'
            ]);
        }

        $token = $user->createToken($request->email)->plainTextToken;

        return response([
            'message' => 'Login successfully!',
            'token' => $token
        ], 201);
    }

    function logout(Request $request)
    {

        $request->user()->tokens()->delete();

        return response([
            'message' => 'Logged out successfully!',
        ], 200);
    }
}
