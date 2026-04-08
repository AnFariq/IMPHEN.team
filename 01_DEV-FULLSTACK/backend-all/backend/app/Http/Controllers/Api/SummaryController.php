<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DailySummary;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SummaryController extends Controller
{
    public function getDashboardData(Request $request)
    {
        $user = $request->user();

        // 1. Data Ringkasan Hari Ini
        $today = DailySummary::where('user_id', $user->id)
            ->whereDate('date', Carbon::today()->format('Y-m-d'))
            ->first();

        // 2. Data Grafik 7 Hari Terakhir
        $chartData = DailySummary::where('user_id', $user->id)
            ->where('date', '>=', Carbon::now()->subDays(7))
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'today' => $today,
            'chart' => $chartData,
            'target_calories' => $user->profile->target_calories ?? 2000
        ]);
    }
}