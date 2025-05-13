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
        Schema::create('time_tables', function (Blueprint $table) {
            $table->bigIncrements('timetable_id');
            $table->string('timetable_Index');
            $table->string('year');
            $table->string('accedamic_year');
            $table->string('semester');
            $table->string('monday');
            $table->string('tuday');
            $table->string('wenday');
            $table->string('theday');
            $table->string('friday');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_tables');
    }
};
