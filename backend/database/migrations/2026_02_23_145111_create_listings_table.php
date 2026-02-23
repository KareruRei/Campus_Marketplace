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
        Schema::create('listings', function (Blueprint $table) {
            $table->bigIncrements('LISTING_ID');

            $table->unsignedBigInteger('LISTING_SELLER_ID');
            $table->foreign('LISTING_SELLER_ID')
              ->references('SELLER_ID')
              ->on('seller_users')
              ->onDelete('cascade');

            $table->unsignedBigInteger('LISTING_CAT_ID');
            $table->foreign('LISTING_CAT_ID')
              ->references('CATEGORY_ID')
              ->on('categories')
              ->onDelete('cascade');

            $table->string('LISTING_TITLE', 150);
            $table->text('LISTING_DESC');
            $table->decimal('LISTING_PRICE', 10, 2);

            $table->enum('LISTING_STATUS', ['Active', 'Sold', 'Removed']);
            $table->enum('LISTING_COND', ['New', 'Used']);

            $table->dateTime('LISTING_CREATED_AT');

            $table->boolean('LISTING_IS_DELETED')->default(false);
            $table->dateTime('LISTING_DELETED_AT')->nullable();

            $table->unsignedBigInteger('LISTING_DELETED_BY')->nullable();
            $table->foreign('LISTING_DELETED_BY')
              ->references('USER_ID')
              ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
