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
            $table->unsignedBigInteger('faculties_id');
            $table->unsignedBigInteger('department_id');
            $table->string('monday');
            $table->string('tuday');
            $table->string('wenday');
            $table->string('theday');
            $table->string('friday');
            $table->timestamps();
            $table->foreign('faculties_id')->references('faculties_id')->on('faculties')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('department_id')->references('department_id')->on('departments')->onUpdate('cascade')->onDelete('cascade');
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
