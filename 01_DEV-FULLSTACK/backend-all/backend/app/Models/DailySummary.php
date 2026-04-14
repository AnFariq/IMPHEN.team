<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailySummary extends Model
{
    use HasFactory;

    // Sesuaikan dengan nama kolom yang BENAR-BENAR ada di database Anda
    protected $fillable = [
        'user_id',
        'date',
        'calories_in',   // Diubah dari total_calories_in
        'calories_out',  // Diubah dari total_calories_out
        'protein',       // Tambahan
        'carbs',         // Tambahan
        'fat',           // Tambahan
        'water',         // Tambahan
        'status',        
    ];

    protected $casts = [
        'date' => 'date',
        // Opsional: Pastikan angka diperlakukan sebagai integer/float
        'calories_in' => 'integer',
        'calories_out' => 'integer',
        'protein' => 'integer',
        'carbs' => 'integer',
        'fat' => 'integer',
        'water' => 'integer',
    ];

    /**
     * Relasi: Satu ringkasan harian milik satu User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Accessor kustom untuk mendapatkan net_calories secara on-the-fly
     * Karena net_calories tidak disimpan di DB, kita bisa menghitungnya otomatis
     */
    public function getNetCaloriesAttribute()
    {
        return $this->calories_in - $this->calories_out;
    }
}