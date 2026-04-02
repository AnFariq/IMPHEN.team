<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MLPredictionLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'endpoint',        // Misal: "/predict-burn" atau "/predict-food"
        'request_payload', // Data yang dikirim (dalam bentuk JSON)
        'response_payload',// Jawaban dari AI (dalam bentuk JSON)
        'status',          // "success" atau "failed"
    ];

    /**
     * Kita simpan data JSON agar lebih fleksibel
     */
    protected $casts = [
        'request_payload' => 'array',
        'response_payload' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}