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
        Schema::create('plat_medias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plat_id')->constrained('plats')->cascadeOnDelete();
            $table->enum('type', ['photo', 'video']);
            $table->enum('status', ['pending', 'uploaded', 'processed', 'failed'])->default('pending');
            $table->string('s3_key');
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('size')->nullable();
            $table->unsignedInteger('duration')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plat_medias');
    }
};
