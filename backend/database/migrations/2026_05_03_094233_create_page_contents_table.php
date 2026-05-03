<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug'); // home, about, contact, academic
            $table->string('section_key'); // hero_title, hero_description, vision, mission, etc.
            $table->text('content')->nullable();
            $table->string('image_path')->nullable();
            $table->string('title')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['page_slug', 'section_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
