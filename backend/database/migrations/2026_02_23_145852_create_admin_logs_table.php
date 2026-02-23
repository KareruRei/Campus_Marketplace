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
        Schema::create('admin_logs', function (Blueprint $table) {
            $table->bigIncrements('ADMIN_LOGS_ID');

                $table->unsignedBigInteger('ADMIN_LOGS_ADMIN_ID');
            $table->foreign('ADMIN_LOGS_ADMIN_ID')
              ->references('USER_ID')
              ->on('users');

            $table->enum('ADMIN_LOGS_ACTION', ['BAN_USER', 'DELETE_LISTING']);
            $table->enum('ADMIN_LOGS_TARGET_TYPE', ['USER', 'LISTING', 'REPORT']);
            $table->unsignedBigInteger('ADMIN_LOGS_TARGET_ID');

            $table->text('ADMIN_LOGS_DESC');
            $table->dateTime('ADMIN_LOGS_CREATED_AT');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_logs');
    }
};
