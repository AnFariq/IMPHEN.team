<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_summaries', function (Blueprint $table) {
            $table->id();

            // RELATION
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // DATE
            $table->date('date')->index();

            // CALORIES
            $table->integer('calories_in')->default(0);   // dari makanan
            $table->integer('calories_out')->default(0);  // dari aktivitas

            // MACROS (gram)
            $table->integer('protein')->default(0);
            $table->integer('carbs')->default(0);
            $table->integer('fat')->default(0);

            // WATER (jumlah gelas)
            $table->integer('water')->default(0);

            // OPTIONAL STATUS (cutting, bulking, maintain)
            $table->string('status')->nullable();

            $table->timestamps();

            // OPTIMIZATION
            $table->unique(['user_id', 'date']); // 1 user 1 hari 1 record
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_summaries');
    }
};