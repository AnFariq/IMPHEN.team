<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'full_name', 'email', 'gender', 'date_of_birth', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relasi: User memiliki satu Profil.
     * Penggunaan: $user->profile->weight
     */
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }
    // Tambahkan di dalam class User
    public function getAgeAttribute()
    {
        // Menghitung selisih tahun antara tanggal lahir dan sekarang
        return \Carbon\Carbon::parse($this->date_of_birth)->age;
    }

    // Pastikan age disertakan saat model diubah ke JSON
    protected $appends = ['age'];
}
