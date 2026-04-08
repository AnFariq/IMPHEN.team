<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->float('weight');          // Berat Badan (kg)
            $table->float('height');          // Tinggi Badan (cm)
            $table->integer('age');           // Usia
            $table->enum('gender', ['male', 'female']);
            $table->string('activity_level'); // Misal: sedentary, active, dll
            $table->float('target_calories')->nullable(); // Target harian
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
