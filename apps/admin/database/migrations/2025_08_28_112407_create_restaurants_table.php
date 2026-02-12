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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();

            // Relation avec le propriétaire (utilisateur)
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('banniere')->nullable();
            $table->string('phone')->nullable();
            $table->string('ville')->nullable();
            $table->string('email')->nullable();
            $table->string('whatsapp_number')->nullable();

            $table->json('opening_hours')->nullable();
            $table->boolean('accept_order')->default(true);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
