<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MLClientService
{
    protected $baseUrl;

    public function __construct()
    {
        // Nantinya URL ini diatur di .env (contoh: ML_SERVICE_URL=http://127.0.0.1:5000)
        $this->baseUrl = config('services.ml.url', env('ML_SERVICE_URL', 'http://localhost:5000'));
    }

    public function getPrediction($endpoint, $data)
    {
        try {
            $response = Http::timeout(10)->post($this->baseUrl . $endpoint, $data);

            if ($response->successful()) {
                return [
                    'status' => 'success',
                    'data' => $response->json()
                ];
            }

            return ['status' => 'error', 'message' => 'AI Service returned error'];
        } catch (\Exception $e) {
            Log::error("ML Service Error: " . $e->getMessage());
            return ['status' => 'offline', 'message' => 'AI Service is unreachable'];
        }
    }
}