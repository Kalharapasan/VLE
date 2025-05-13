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
        Schema::create('passpapers', function (Blueprint $table) {
            $table->bigIncrements('passpapers_id');
            $table->string('passpaprs_Index');
            $table->unsignedBigInteger('subject_id');
            $table->string('document');
            $table->text('description');
            $table->foreign('subject_id')->references('subject_id')->on('subjects')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passpapers');
    }
};
