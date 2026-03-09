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
        Schema::table('commande_plat', function (Blueprint $table) {
            $table->foreignId('accompagnement_id')->nullable()->constrained()->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('commande_plat', function (Blueprint $table) {
            $table->dropForeign(['accompagnement_id']);
            $table->dropColumn('accompagnement_id');
        });
    }
};
