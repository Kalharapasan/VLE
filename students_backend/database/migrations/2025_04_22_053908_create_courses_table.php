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
        Schema::create('courses', function (Blueprint $table) {
            $table->bigIncrements('course_id');
            $table->string('course_Index');
            $table->string('course_name');
            $table->text('description');
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
        Schema::dropIfExists('courses');
    }
};
