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
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('student_id');
            $table->string('student_Index');
            $table->string('student_fname');
            $table->string('student_lname');
            $table->dateTime('student_birthday');
            $table->string('student_email');
            $table->string('student_nic');
            $table->string('student_gender');
            $table->unsignedBigInteger('faculties_id');
            $table->unsignedBigInteger('department_id');
            $table->foreign('faculties_id')->references('faculties_id')->on('faculties')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('department_id')->references('department_id')->on('departments')->onUpdate('cascade')->onDelete('cascade');
            $table->string('studen_img')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
