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
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('TRANSACTIONS_ID');

            $table->unsignedBigInteger('TRANSACTIONS_BUYER_ID');
            $table->foreign('TRANSACTIONS_BUYER_ID')
              ->references('USER_ID')
              ->on('users');

            $table->unsignedBigInteger('TRANSACTIONS_SELLER_ID');
            $table->foreign('TRANSACTIONS_SELLER_ID')
              ->references('USER_ID')
              ->on('users');

            $table->enum('TRANSACTIONS_STATUS', [
            'Preparing',
            'Packed',
            'For Pickup',
            'Completed'
        ]);

            $table->dateTime('TRANSACTIONS_CREATED_AT');
            $table->dateTime('TRANSACTIONS_MEETUP');
            $table->decimal('TRANSACTIONS_TOTAL', 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
