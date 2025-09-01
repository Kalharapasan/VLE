<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_gpa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->decimal('gpa', 3, 2);
            $table->integer('semester');
            $table->timestamps();

            $table->unique(['student_id', 'course_id', 'semester']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_gpa');
    }
};
