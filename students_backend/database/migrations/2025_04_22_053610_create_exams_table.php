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
        Schema::create('exams', function (Blueprint $table) {
            $table->bigIncrements('exam_id');
            $table->string('exam_Index');
            $table->string('exam_name');
            $table->string('exam_start_date');
            $table->string('exam_end_date');
            $table->unsignedBigInteger('faculties_id');
            $table->unsignedBigInteger('department_id');
            $table->foreign('faculties_id')->references('faculties_id')->on('faculties')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('department_id')->references('department_id')->on('departments')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
