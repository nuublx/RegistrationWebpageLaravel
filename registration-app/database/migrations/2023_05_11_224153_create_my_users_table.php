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
        Schema::create('my_users', function (Blueprint $table) {
            $table->id();
            $table->string('user_id', 30)->unique();
            $table->string('user_name', 20)->unique();
            $table->string('full_name', 50);
            $table->date('birth_date');
            $table->string('phone', 20);
            $table->string('address', 100);
            $table->string('user_image', 100);
            $table->string('email', 50);
            $table->string('password', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_users');
    }
};