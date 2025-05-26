<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->bigIncrements('admin_id');
            $table->string('admin_Index');
            $table->string('admin_fname');
            $table->string('admin_lname');
            $table->date('admin_birthday'); // Changed from dateTime to date
            $table->string('admin_email');
            $table->string('admin_nic');
            $table->string('admin_gender');
            $table->string('admin_address');
            $table->string('admin_img')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
