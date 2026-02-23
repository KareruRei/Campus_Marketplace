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
        Schema::create('reports', function (Blueprint $table) {
            $table->bigIncrements('REPORT_ID');

            $table->unsignedBigInteger('REPORT_USER_ID');
            $table->foreign('REPORT_USER_ID')
              ->references('USER_ID')
              ->on('users');

            $table->unsignedBigInteger('REPORT_LISTING_ID');
            $table->foreign('REPORT_LISTING_ID')
              ->references('LISTING_ID')
              ->on('listings');

            $table->text('REPORT_DESC');

            $table->dateTime('REPORT_CREATED_AT');
            $table->dateTime('REPORT_REVIEWED_AT')->nullable();

            $table->unsignedBigInteger('REPORT_REVIEWED_BY')->nullable();
            $table->foreign('REPORT_REVIEWED_BY')
              ->references('USER_ID')
              ->on('users');

            $table->enum('REPORT_STATUS', ['Pending', 'Reviewed', 'Resolved']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
