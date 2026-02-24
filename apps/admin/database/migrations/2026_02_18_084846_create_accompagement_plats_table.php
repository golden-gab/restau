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
        Schema::create('accompagement_plats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plat_id')->constrained()->cascadeOnDelete();
            $table->foreignId('accompagnement_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accompagement_plats');
    }
};
