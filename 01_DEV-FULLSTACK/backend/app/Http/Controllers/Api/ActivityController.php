<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\UserActivityBurn;
use App\Services\CalorieService;
use App\Services\DailySummaryService;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    protected $calorieService;
    protected $summaryService;

    public function __construct(CalorieService $cs, DailySummaryService $ds)
    {
        $this->calorieService = $cs;
        $this->summaryService = $ds;
    }

    // List semua jenis olahraga (untuk dropdown di Next.js)
    public function index()
    {
        return response()->json(Activity::all());
    }

    // Simpan catatan olahraga user
    public function store(Request $request)
    {
        $request->validate([
            'activity_id' => 'required|exists:activities,id',
            'duration_minutes' => 'required|numeric',
        ]);

        $activity = Activity::find($request->activity_id);
        $user = $request->user();
        
        // Ambil berat badan dari profil, default 60kg jika belum diisi
        $weight = $user->profile->weight ?: 60;

        // Hitung kalori terbakar via Service
        $burned = $this->calorieService->calculateActivityBurn(
            $activity->met_value, 
            $weight, 
            $request->duration_minutes
        );

        $burnRecord = UserActivityBurn::create([
            'user_id' => $user->id,
            'activity_id' => $request->activity_id,
            'duration_minutes' => $request->duration_minutes,
            'calories_burned' => $burned,
        ]);

        // Update Ringkasan Harian (Kalori Keluar)
        $this->summaryService->updateDailySummary($user->id);

        return response()->json($burnRecord, 201);
    }
}