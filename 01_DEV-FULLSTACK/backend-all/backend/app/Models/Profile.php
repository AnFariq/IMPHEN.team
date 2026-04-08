<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasFactory;

    /**
     * Kolom yang boleh diisi secara massal (Mass Assignment).
     * Ini harus sesuai dengan kolom yang kamu buat di file migration tadi.
     */
    protected $fillable = [
        'user_id',
        'weight',
        'height',
        'age',
        'gender',
        'activity_level',
        'target_calories',
    ];

    /**
     * Relasi: Satu profil dimiliki oleh satu User.
     * Ini memudahkan kamu memanggil data user dari profil, misal: $profile->user->name
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}