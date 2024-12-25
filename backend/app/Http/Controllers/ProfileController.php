<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    function get_profile(Request $request)
    {
        $profile = User::find($request->user())
            ->select('id', 'name', 'email');

        $data = $profile[0];
        return response(
            $data,
            200
        );
    }
}
