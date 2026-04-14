<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DailySummary;
use App\Models\UserActivityBurn; // <-- PENTING: Import model aktivitas
use Illuminate\Http\Request;
use Carbon\Carbon;

class SummaryController extends Controller
{
    public function getDashboardData(Request $request)
    {
        $user = $request->user();
        $todayDate = now()->toDateString();

        // 1. Ambil ringkasan harian (Kalori & Nutrisi)
        $today = DailySummary::where('user_id', $user->id)
            ->whereDate('date', $todayDate)
            ->first();

        // 2. Ambil riwayat aktivitas olahraga HARI INI (Maksimal 5 agar dashboard rapi)
        $recentActivities = UserActivityBurn::with('activity')
            ->where('user_id', $user->id)
            ->whereDate('created_at', $todayDate)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // 3. Kembalikan response JSON sesuai format yang dibaca oleh React Dashboard
        return response()->json([
            'target_calories' => $user->profile->target_calories ?? 2000,
            
            // Bungkus di dalam 'today' sesuai dengan ekspektasi Frontend
            'today' => [
                'calories_in'  => $today->calories_in ?? 0,
                'calories_out' => $today->calories_out ?? 0, // Untuk dimunculkan di hero card
                
                'protein' => $today->protein ?? 0,
                'carbs'   => $today->carbs ?? 0,
                'fat'     => $today->fat ?? 0,
                'water'   => $today->water ?? 0,
                
                'meals'      => [], // Nanti diisi dari table intake
                'activities' => $recentActivities, // Data aktivitas masuk ke sini
            ],
            
            'chart' => [],
        ]);
    }
}