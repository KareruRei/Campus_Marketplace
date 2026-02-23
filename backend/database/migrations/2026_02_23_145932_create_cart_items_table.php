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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->bigIncrements('CART_ITEMS_ID');

            $table->unsignedBigInteger('CART_ITEMS_USER_ID');
            $table->foreign('CART_ITEMS_USER_ID')
              ->references('USER_ID')
              ->on('users')
              ->onDelete('cascade');

            $table->unsignedBigInteger('CART_ITEMS_LISTING_ID');
            $table->foreign('CART_ITEMS_LISTING_ID')
              ->references('LISTING_ID')
              ->on('listings')
              ->onDelete('cascade');

            $table->integer('CART_ITEMS_QUANTITY');
            $table->dateTime('CART_ITEMS_ADDEDAT');

            $table->enum('CART_ITEM_STATUS', ['Active', 'Reserved', 'Removed']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
