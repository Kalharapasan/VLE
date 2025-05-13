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
        Schema::create('studen_payments', function (Blueprint $table) {
            $table->bigIncrements('payment_id');
            $table->string('payment_Index');
            $table->unsignedBigInteger('student_id');
            $table->string('payment_reson');
            $table->text('description');
            $table->foreign('student_id')->references('student_id')->on('students')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studen_payments');
    }
};
