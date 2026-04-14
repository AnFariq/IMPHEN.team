<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Activity;


class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        Activity::insert([

            // ================= CARDIO =================
            ['name' => 'Running (slow)', 'met_value' => 7.0, 'category' => 'Cardio'],
            ['name' => 'Running (moderate)', 'met_value' => 9.8, 'category' => 'Cardio'],
            ['name' => 'Running (fast)', 'met_value' => 11.0, 'category' => 'Cardio'],
            ['name' => 'Walking (slow)', 'met_value' => 2.5, 'category' => 'Cardio'],
            ['name' => 'Walking (normal)', 'met_value' => 3.5, 'category' => 'Cardio'],
            ['name' => 'Walking (fast)', 'met_value' => 4.5, 'category' => 'Cardio'],
            ['name' => 'Cycling (light)', 'met_value' => 4.0, 'category' => 'Cardio'],
            ['name' => 'Cycling (moderate)', 'met_value' => 7.5, 'category' => 'Cardio'],
            ['name' => 'Cycling (fast)', 'met_value' => 10.0, 'category' => 'Cardio'],
            ['name' => 'Jump Rope', 'met_value' => 12.3, 'category' => 'Cardio'],

            // ================= GYM =================
            ['name' => 'Weight Lifting (light)', 'met_value' => 3.0, 'category' => 'Gym'],
            ['name' => 'Weight Lifting (moderate)', 'met_value' => 5.0, 'category' => 'Gym'],
            ['name' => 'Weight Lifting (heavy)', 'met_value' => 6.0, 'category' => 'Gym'],
            ['name' => 'Bodyweight Workout', 'met_value' => 8.0, 'category' => 'Gym'],
            ['name' => 'Crossfit', 'met_value' => 10.0, 'category' => 'Gym'],

            // ================= SPORTS =================
            ['name' => 'Football (Soccer)', 'met_value' => 7.0, 'category' => 'Sports'],
            ['name' => 'Basketball', 'met_value' => 6.5, 'category' => 'Sports'],
            ['name' => 'Badminton', 'met_value' => 5.5, 'category' => 'Sports'],
            ['name' => 'Tennis', 'met_value' => 7.3, 'category' => 'Sports'],
            ['name' => 'Volleyball', 'met_value' => 4.0, 'category' => 'Sports'],

            // ================= WATER =================
            ['name' => 'Swimming (light)', 'met_value' => 6.0, 'category' => 'Water'],
            ['name' => 'Swimming (moderate)', 'met_value' => 8.0, 'category' => 'Water'],
            ['name' => 'Swimming (fast)', 'met_value' => 10.0, 'category' => 'Water'],

            // ================= DAILY =================
            ['name' => 'Cleaning House', 'met_value' => 3.5, 'category' => 'Daily'],
            ['name' => 'Cooking', 'met_value' => 2.5, 'category' => 'Daily'],
            ['name' => 'Gardening', 'met_value' => 4.0, 'category' => 'Daily'],
            ['name' => 'Climbing Stairs', 'met_value' => 8.8, 'category' => 'Daily'],

            // ================= FITNESS =================
            ['name' => 'Yoga', 'met_value' => 2.5, 'category' => 'Fitness'],
            ['name' => 'Pilates', 'met_value' => 3.0, 'category' => 'Fitness'],
            ['name' => 'Zumba', 'met_value' => 6.5, 'category' => 'Fitness'],
            ['name' => 'HIIT', 'met_value' => 9.0, 'category' => 'Fitness'],
        ]);
    }
}
