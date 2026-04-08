<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserFoodIntake;
use App\Models\Food;
use App\Services\CalorieService;
use App\Services\DailySummaryService;
use Illuminate\Http\Request;

class IntakeController extends Controller
{
    protected $calorieService;
    protected $summaryService;

    public function __construct(CalorieService $cs, DailySummaryService $ds)
    {
        $this->calorieService = $cs;
        $this->summaryService = $ds;
    }

    public function store(Request $request)
    {
        $request->validate([
            'food_id' => 'required|exists:foods,id',
            'qty_grams' => 'required|numeric',
            'consumed_at' => 'required|date',
        ]);

        $food = Food::find($request->food_id);
        
        // Hitung kalori lewat Service
        $totalCal = $this->calorieService->calculateFoodCalories(
            $food->calories_per_100g, 
            $request->qty_grams
        );

        $intake = UserFoodIntake::create([
            'user_id' => $request->user()->id,
            'food_id' => $request->food_id,
            'qty_grams' => $request->qty_grams,
            'total_calories' => $totalCal,
            'consumed_at' => $request->consumed_at,
        ]);

        // Update Ringkasan Harian secara otomatis
        $this->summaryService->updateDailySummary($request->user()->id);

        return response()->json($intake, 201);
    }
}