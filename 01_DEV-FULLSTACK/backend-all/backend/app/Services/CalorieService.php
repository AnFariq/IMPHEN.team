<?php

namespace App\Services;

class CalorieService
{
    /**
     * Menghitung BMR menggunakan rumus Mifflin-St Jeor
     */
    public function calculateBMR($weight, $height, $age, $gender)
    {
        if ($gender === 'male') {
            return (10 * $weight) + (6.25 * $height) - (5 * $age) + 5;
        }
        return (10 * $weight) + (6.25 * $height) - (5 * $age) - 161;
    }

    /**
     * Menghitung Kalori Terbakar (MET)
     * Rumus: MET * Berat(kg) * (Durasi/60)
     */
    public function calculateActivityBurn($met, $weight, $durationMinutes)
    {
        return $met * $weight * ($durationMinutes / 60);
    }

    /**
     * Menghitung Kalori Makanan berdasarkan berat
     */
    public function calculateFoodCalories($caloriesPer100g, $qtyGrams)
    {
        return ($caloriesPer100g / 100) * $qtyGrams;
    }
}