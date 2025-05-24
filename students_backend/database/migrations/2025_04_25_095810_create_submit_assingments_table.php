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
        Schema::create('submit_assingments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('assingment_id');
            $table->unsignedBigInteger('subject_id');
            $table->unsignedBigInteger('student_id');
            $table->string('document');
            $table->text('description');
            $table->foreign('assingment_id')->references('assingment_id')->on('assingments')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('student_id')->references('student_id')->on('students')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('subject_id')->references('subject_id')->on('subjects')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submit_assingments');
    }
};
