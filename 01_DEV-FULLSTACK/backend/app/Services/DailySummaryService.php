<?php

namespace App\Services;

use App\Models\DailySummary;
use App\Models\UserFoodIntake;
use App\Models\UserActivityBurn;
use Carbon\Carbon;

class DailySummaryService
{
    public function updateDailySummary($userId, $date = null)
    {
        $date = $date ?: Carbon::today()->format('Y-m-d');

        // 1. Hitung total kalori masuk
        $totalIn = UserFoodIntake::where('user_id', $userId)
            ->whereDate('consumed_at', $date)
            ->sum('total_calories');

        // 2. Hitung total kalori keluar
        $totalOut = UserActivityBurn::where('user_id', $userId)
            ->whereDate('created_at', $date) // Asumsi created_at adalah waktu olahraga
            ->sum('calories_burned');

        // 3. Simpan atau Update ke tabel daily_summaries
        return DailySummary::updateOrCreate(
            ['user_id' => $userId, 'date' => $date],
            [
                'total_calories_in' => $totalIn,
                'total_calories_out' => $totalOut,
                'net_calories' => $totalIn - $totalOut,
            ]
        );
    }
}