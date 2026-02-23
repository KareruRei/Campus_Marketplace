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
        Schema::create('order_items', function (Blueprint $table) {
            $table->bigIncrements('ORDER_ITEM_ID');

            $table->unsignedBigInteger('ORDER_ITEM_TRANSACTION_ID');
            $table->foreign('ORDER_ITEM_TRANSACTION_ID')
              ->references('TRANSACTIONS_ID')
              ->on('transactions')
              ->onDelete('cascade');

            $table->unsignedBigInteger('ORDER_ITEM_LISTING_ID');
            $table->foreign('ORDER_ITEM_LISTING_ID')
              ->references('LISTING_ID')
              ->on('listings');

            $table->decimal('ORDER_ITEM_PRICE', 10, 2);
            $table->integer('ORDER_ITEM_QTY');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
