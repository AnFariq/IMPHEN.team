<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MLClientService;
use App\Models\MLPredictionLog;
use Illuminate\Http\Request;

class MLProxyController extends Controller
{
    protected $mlService;

    public function __construct(MLClientService $ml)
    {
        $this->mlService = $ml;
    }

    public function predictBurn(Request $request)
    {
        // Data input dari Next.js (usia, berat, denyut jantung, dll)
        $inputData = $request->validate([
            'age' => 'required|numeric',
            'weight' => 'required|numeric',
            'heart_rate' => 'required|numeric',
            'duration' => 'required|numeric',
        ]);

        // Panggil AI Service
        $prediction = $this->mlService->getPrediction('/predict-burn', $inputData);

        // Catat ke Log (Hitam di atas putih)
        MLPredictionLog::create([
            'user_id' => $request->user()->id,
            'endpoint' => '/predict-burn',
            'request_payload' => $inputData,
            'response_payload' => $prediction,
            'status' => $prediction['status']
        ]);

        return response()->json($prediction);
    }
}