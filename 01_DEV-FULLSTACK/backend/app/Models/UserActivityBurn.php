<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserActivityBurn extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'activity_id',
        'duration_minutes',
        'calories_burned', // Hasil hitung: MET * Berat * (Durasi/60)
    ];

    /**
     * Relasi: Catatan bakar kalori ini milik satu User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi: Merujuk ke jenis aktivitas apa yang dilakukan.
     * Penggunaan: $burn->activity->name
     */
    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
}