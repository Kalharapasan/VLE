<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->bigIncrements('teacher_id');
            $table->string('teacher_Index');
            $table->string('teacher_fname');
            $table->string('teacher_lname');
            $table->dateTime('teacher_birthday');
            $table->string('teacher_email');
            $table->string('teacher_nic');
            $table->string('teacher_gender');
            $table->unsignedBigInteger('faculties_id');
            $table->unsignedBigInteger('department_id');
            $table->string('teacher_img')->nullable();
            $table->text('description')->nullable();
            $table->foreign('faculties_id')->references('faculties_id')->on('faculties')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('department_id')->references('department_id')->on('departments')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
