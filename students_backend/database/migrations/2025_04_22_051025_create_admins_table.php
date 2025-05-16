<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id('admin_id');
            $table->string('admin_Index')->unique();
            $table->string('admin_fname');
            $table->string('admin_lname');
            $table->date('admin_birthday');
            $table->string('admin_email')->unique();
            $table->string('admin_nic')->unique();
            $table->enum('admin_gender', ['male', 'female', 'other']);
            $table->string('admin_address');
            $table->string('admin_img')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('admins');
    }
};

