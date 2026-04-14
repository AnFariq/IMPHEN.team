<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'met_value', // Nilai standar pembakaran kalori per aktivitas
    ];

    /**
     * Relasi: Satu jenis aktivitas bisa dilakukan berkali-kali oleh banyak user.
     */
    public function burns(): HasMany
    {
        return $this->hasMany(UserActivityBurn::class);
    }
}