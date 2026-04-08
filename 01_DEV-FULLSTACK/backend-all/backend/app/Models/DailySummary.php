<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailySummary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'total_calories_in',  // Total dari semua makanan
        'total_calories_out', // Total dari semua olahraga
        'net_calories',       // (In - Out)
        'status',             // Misal: "Surplus", "Defisit", atau "Sesuai Target"
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Relasi: Satu ringkasan harian milik satu User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}