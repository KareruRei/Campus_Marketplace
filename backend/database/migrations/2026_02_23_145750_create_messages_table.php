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
        Schema::create('messages', function (Blueprint $table) {
            $table->bigIncrements('MESSAGE_ID');

            $table->unsignedBigInteger('MESSAGE_SENDER_ID');
            $table->foreign('MESSAGE_SENDER_ID')
              ->references('USER_ID')
              ->on('users');

            $table->unsignedBigInteger('MESSAGE_RECEIVER_ID');
            $table->foreign('MESSAGE_RECEIVER_ID')
              ->references('USER_ID')
              ->on('users');

            $table->unsignedBigInteger('MESSAGE_LISTING_ID');
            $table->foreign('MESSAGE_LISTING_ID')
              ->references('LISTING_ID')
              ->on('listings');

            $table->unsignedBigInteger('MESSAGE_TRANSACTIONS_ID')->nullable();
            $table->foreign('MESSAGE_TRANSACTIONS_ID')
              ->references('TRANSACTIONS_ID')
              ->on('transactions');

            $table->string('MESSAGE_TEXT', 255);
            $table->dateTime('MESSAGE_SENTAT');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
