<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictAccessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedOrigin = env('ALLOWED_ORIGIN');

        // Check the Origin or Referer header
        $origin = $request->header('Origin') ?: $request->header('Referer');

        if (!$origin || strpos($origin, $allowedOrigin) !== 0) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}