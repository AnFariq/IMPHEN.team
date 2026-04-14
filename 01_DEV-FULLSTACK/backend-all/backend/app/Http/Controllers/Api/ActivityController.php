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
        return response()->json(Activity::orderBy('category')->get());
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
    // Ambil riwayat olahraga user (untuk history di React)
    public function history(Request $request)
    {
        // Mengambil data dari tabel user_activity_burns milik user yang sedang login
        // with('activity') digunakan agar relasi ke tabel activities (nama olahraga) ikut terbawa
        $records = UserActivityBurn::with('activity')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc') // Urutkan dari yang terbaru
            ->get();

        return response()->json($records);
    }
}